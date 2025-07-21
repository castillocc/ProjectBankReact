import toast from "react-hot-toast";

/**
 * Ejecuta una promesa con estados de toast (loading, success, error), validaciones y callbacks.
 *
 * @param {Promise|Function} promiseOrFn - Promesa o función que retorna promesa.
 * @param {Object} messages - { loading, success, error }
 * @param {Object} config - Opcional: { iconos, onSuccess, onError, toastOptions, validate, onInvalid }
 */
export const showToastRequest = async (
  promiseOrFn,
  messages = {},
  config = {}
) => {
  const {
    onSuccess = () => {},
    onError = () => {},
    onInvalid = null, // acción si falla la validación
    validate = null,  // función de validación, ej: () => !!user
    toastOptions = {},
    iconos = { success: "✅", error: "❌", loading: "⏳" },
  } = config;

  // Validación previa
  if (validate && !validate()) {
    toast.error(messages?.invalid || "Operación no permitida ❌");
    if (onInvalid) onInvalid();
    return;
  }

  try {
    const result = await toast.promise(
      typeof promiseOrFn === "function" ? promiseOrFn() : promiseOrFn,
      {
        loading: `${iconos.loading || ""} ${messages.loading || "Cargando..."}`,
        success: `${iconos.success || ""} ${messages.success || "Éxito"}`,
        error: `${iconos.error || ""} ${messages.error || "Error"}`,
      },
      {
        duration: 3000,
        ...toastOptions,
      }
    );

    onSuccess(result);
    return result;
  } catch (err) {
    onError(err);
    throw err;
  }
};
