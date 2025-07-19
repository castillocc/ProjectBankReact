const ConfirmDialog = ({ title, message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-md max-w-sm w-full">
                {title && <h2 className="text-lg font-semibold mb-2 text-gray-800">{title}</h2>}
                <div className="text-sm text-gray-700">{message}</div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onCancel}
                        className="px-4 py-1 text-sm rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-1 text-sm rounded bg-red-600 text-white hover:bg-red-700"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
