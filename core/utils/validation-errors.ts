type TypeWithKey<T> = { [key: string]: T };

export function getValidationError(error: any): string {
  const codeMatcher: TypeWithKey<string> = {
    // AXIOS ERRORS MESSAGE
    ECONNABORTED: 'La solicitud tardó demasiado, por favor intenta de nuevo.',
    ENOTFOUND: 'No se pudo conectar a la red, verifica tu conexión.',
    ECONNREFUSED: 'No se pudo establecer la conexión, por favor intenta más tarde.',
    ECONNRESET: 'La conexión se perdió, por favor intenta de nuevo.',
    ERR_BAD_REQUEST: 'Hubo un problema con la solicitud, por favor revisa e intenta de nuevo.',
    ERR_INTERNAL_SERVER_ERROR: 'Ocurrió un error en el servidor, por favor intenta más tarde.',
    ERR_NOT_IMPLEMENTED: 'Esta funcionalidad aún no está disponible.',
    ERR_BAD_GATEWAY: 'Hubo un problema con la respuesta del servidor, por favor intenta de nuevo.',
    ERR_SERVICE_UNAVAILABLE: 'El servicio no está disponible en este momento, por favor intenta más tarde.',
    ERR_GATEWAY_TIMEOUT: 'El servidor tardó demasiado en responder, por favor intenta de nuevo.',
  };

  return error.response.data.message || codeMatcher[error.code] || error.message;
}
