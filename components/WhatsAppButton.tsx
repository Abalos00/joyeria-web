"use client";

const WHATSAPP_NUMBER = "56930273601";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hola, vi la web de Joyería Zamir y me gustaría más información sobre sus joyas."
);

export default function WhatsAppButton() {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 inline-flex items-center justify-center rounded-full p-3 md:p-4 shadow-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
      aria-label="Escríbenos por WhatsApp"
    >
      {/* Ícono simple */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 md:h-7 md:w-7"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12.04 2C6.59 2 2.21 6.37 2.21 11.82c0 2.09.61 4.02 1.78 5.7L2 22l4.61-1.49a9.95 9.95 0 0 0 5.43 1.59h.01c5.45 0 9.83-4.37 9.83-9.82C21.88 6.37 17.49 2 12.04 2Zm.01 17.52h-.01a8.06 8.06 0 0 1-4.1-1.12l-.29-.17-2.73.88.89-2.66-.18-.27a8.02 8.02 0 0 1-1.25-4.33c0-4.45 3.63-8.07 8.09-8.07 2.16 0 4.19.84 5.72 2.36a8.01 8.01 0 0 1 2.37 5.71c0 4.45-3.63 8.07-8.01 8.07Zm4.4-5.97c-.24-.12-1.43-.71-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.17-.7-.62-1.18-1.37-1.32-1.6-.14-.24-.01-.36.11-.48.12-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.29-.74-1.76-.2-.48-.4-.41-.54-.41-.14 0-.3-.02-.46-.02-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.18 1.1.15 1.52.09.46-.07 1.43-.59 1.63-1.15.2-.56.2-1.04.14-1.15-.06-.11-.22-.18-.46-.3Z" />
      </svg>
    </a>
  );
}
