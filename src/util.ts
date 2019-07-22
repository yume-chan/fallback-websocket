import WebSocket from './websocket';

export function isErrorEvent(e: Event): e is ErrorEvent {
    return 'error' in e;
}

export function connect(url: string): Promise<WebSocket> {
    return new Promise((resolve, reject) => {
        function handleOpen() {
            socket.removeEventListener('open', handleOpen);
            socket.removeEventListener('error', handleError);

            resolve(socket);
        }

        function handleError(e: Event) {
            socket.removeEventListener('open', handleOpen);
            socket.removeEventListener('error', handleError);

            // ws give us an ErrorEvent with error object
            // but browser doesn't give any detail about the error
            if (isErrorEvent(e)) {
                reject(e.error);
            } else {
                reject(new Error('the WebSocket connection cannot be established'));
            }
        }

        const socket = new WebSocket(url);

        socket.addEventListener("open", handleOpen);
        socket.addEventListener("error", handleError);
    });
}
