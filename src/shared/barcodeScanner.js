// Barcode scanning, adapted from simple-inventory-card's
// src/services/barcodeScanner.ts (same @ericblade/quagga2 dependency and
// same live-scan/file-decode behavior) so our cards feel consistent with
// the companion card and don't introduce a second scanning library.
import Quagga from '@ericblade/quagga2';

let active = false;

export function isScannerActive() {
  return active;
}

/**
 * Start a live camera scan into `targetElement`. Resolves with an error
 * code string ('permission_denied' | 'not_available') on failure, or null
 * on success (in which case `onDetected` will be called for each accepted
 * detection until stopScanner() is called).
 * @param {HTMLElement} targetElement
 * @param {(code: string) => void} onDetected
 * @returns {Promise<string | null>}
 */
export function startScanner(targetElement, onDetected) {
  if (active) {
    Quagga.stop();
    Quagga.offDetected();
    active = false;
  }

  targetElement.innerHTML = '';

  return new Promise((resolve) => {
    Quagga.init(
      {
        inputStream: {
          type: 'LiveStream',
          target: targetElement,
          constraints: { facingMode: 'environment' },
        },
        decoder: {
          readers: ['ean_reader', 'ean_8_reader', 'upc_reader', 'upc_e_reader', 'code_128_reader'],
        },
        locate: true,
        frequency: 10,
      },
      (err) => {
        if (err) {
          const message = err.message || '';
          if (
            message.includes('Permission') ||
            message.includes('permission') ||
            message.includes('NotAllowedError')
          ) {
            resolve('permission_denied');
          } else {
            resolve('not_available');
          }
          return;
        }

        Quagga.offDetected();
        Quagga.onDetected((result) => {
          const codeResult = result && result.codeResult;
          if (!codeResult || !codeResult.code) return;

          const errors = (codeResult.decodedCodes || [])
            .filter((d) => typeof d.error === 'number')
            .map((d) => d.error);

          if (errors.length > 0) {
            const avgError = errors.reduce((sum, e) => sum + e, 0) / errors.length;
            if (avgError >= 0.2) return;
          }

          onDetected(codeResult.code);
        });

        Quagga.start();
        active = true;
        resolve(null);
      }
    );
  });
}

export function stopScanner() {
  if (active) {
    Quagga.stop();
    Quagga.offDetected();
    active = false;
  }
}

export function isLiveScanAvailable() {
  return (
    typeof navigator !== 'undefined' &&
    !!navigator.mediaDevices &&
    typeof navigator.mediaDevices.getUserMedia === 'function'
  );
}

function resizeToDataUrl(src, maxDimension) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const longest = Math.max(img.naturalWidth, img.naturalHeight);
      if (longest <= maxDimension) {
        resolve(src);
        return;
      }
      const scale = maxDimension / longest;
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.naturalWidth * scale);
      canvas.height = Math.round(img.naturalHeight * scale);
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(src);
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', 0.92));
    };
    img.onerror = () => resolve(src);
    img.src = src;
  });
}

/**
 * Decode a barcode from a photo file (e.g. a manually-picked image), trying
 * the native BarcodeDetector API first and falling back to Quagga.
 * @param {File} file
 * @param {(code: string) => void} onDetected
 * @returns {Promise<string | null>} 'not_found' on failure, else null
 */
export async function decodeFromFile(file, onDetected) {
  if ('BarcodeDetector' in window) {
    try {
      // eslint-disable-next-line no-undef
      const detector = new window.BarcodeDetector({
        formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e', 'code_128'],
      });
      const bitmap = await createImageBitmap(file);
      const barcodes = await detector.detect(bitmap);
      bitmap.close();

      if (barcodes.length > 0) {
        onDetected(barcodes[0].rawValue);
        return null;
      }
      return 'not_found';
    } catch (err) {
      console.warn('BarcodeDetector: error, falling through to Quagga', err);
    }
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const rawSrc = e.target && e.target.result;
      resizeToDataUrl(rawSrc, 1280)
        .then((src) => {
          try {
            Quagga.decodeSingle(
              {
                src,
                numOfWorkers: 0,
                decoder: {
                  readers: [
                    'ean_reader',
                    'ean_8_reader',
                    'upc_reader',
                    'upc_e_reader',
                    'code_128_reader',
                  ],
                },
                locate: true,
              },
              (result) => {
                if (!result || !result.codeResult || !result.codeResult.code) {
                  resolve('not_found');
                  return;
                }
                const errors = (result.codeResult.decodedCodes || [])
                  .filter((d) => typeof d.error === 'number')
                  .map((d) => d.error);
                if (errors.length > 0) {
                  const avgError = errors.reduce((sum, e) => sum + e, 0) / errors.length;
                  if (avgError >= 0.2) {
                    resolve('not_found');
                    return;
                  }
                }
                onDetected(result.codeResult.code);
                resolve(null);
              }
            );
          } catch {
            resolve('not_found');
          }
        })
        .catch(() => {
          resolve('not_found');
        });
    };
    reader.onerror = () => {
      resolve('not_found');
    };
    reader.readAsDataURL(file);
  });
}
