export const debounce = <T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

export type ToastType = "success" | "error" | "info" | "warning";

let currentToastTimeout: ReturnType<typeof setTimeout> | null = null;
export const showToast = (
  message: string,
  type: ToastType = "info",
  duration: number = 3000,
): void => {
  if (currentToastTimeout) {
    clearTimeout(currentToastTimeout);
  }

  const existingToast = document.querySelector(".toast");
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast--show");
  }, 10);

  currentToastTimeout = setTimeout(() => {
    toast.classList.remove("toast--show");
    setTimeout(() => toast.remove(), 300);
  }, duration);
};

export const confirmAction = async (message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";

    const modal = document.createElement("div");
    modal.className = "modal modal--confirm";

    modal.innerHTML = `
      <div class="modal__content">
        <h3 class="modal__title">Confirmação</h3>
        <p class="modal__message">${message}</p>
        <div class="modal__actions">
          <button class="btn btn--secondary" data-action="cancel">Cancelar</button>
          <button class="btn btn--danger" data-action="confirm">Confirmar</button>
        </div>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    setTimeout(() => {
      overlay.classList.add("modal-overlay--show");
      modal.classList.add("modal--show");
    }, 10);

    const closeModal = (confirmed: boolean) => {
      overlay.classList.remove("modal-overlay--show");
      modal.classList.remove("modal--show");
      setTimeout(() => overlay.remove(), 300);
      resolve(confirmed);
    };

    modal
      .querySelector('[data-action="confirm"]')
      ?.addEventListener("click", () => closeModal(true));
    modal
      .querySelector('[data-action="cancel"]')
      ?.addEventListener("click", () => closeModal(false));
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal(false);
    });
  });
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const getInitials = (name: string): string => {
  const parts = name.trim().split(" ");
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export const scrollToTop = (smooth = true): void => {
  window.scrollTo({
    top: 0,
    behavior: smooth ? "smooth" : "auto",
  });
};

export const parseQueryParams = (search: string): Record<string, string> => {
  const params = new URLSearchParams(search);
  const result: Record<string, string> = {};

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
};
