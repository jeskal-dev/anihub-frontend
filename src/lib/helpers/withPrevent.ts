type EventHandler = (event: Event) => void;

/**
 * Crea un manejador de eventos que previene el comportamiento predeterminado.
 * @param callback - La lógica personalizada que se ejecutará después de prevenir el comportamiento predeterminado.
 * @returns Una función de manejador de eventos con `event.preventDefault()` implementado.
 */
export function withPrevent(callback: (event: Event) => void): EventHandler {
    return (event: Event) => {
        event.preventDefault(); // Previene el comportamiento predeterminado
        callback(event); // Ejecuta la lógica personalizada
    };
}