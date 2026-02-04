type InputBase = {
  label: string;
  value?: string | number;
};

type SelectInput = InputBase & {
  type: "select";
  options: string[]; // required when type is "select"
};

type OtherInput = InputBase & {
  type: "text" | "number" | "date" | "password" | "email" | "phone" | "hidden";
  options?: never; // disallow options for other types
};

type InputTypes = SelectInput | OtherInput;

type ActionType = "Add" | "Save" | "Delete" | "Complete";

interface InputFormModalProps {
  id: string;
  ref: React.RefObject<HTMLDialogElement>;
  title: string;
  inputs: InputTypes[];
  action: ActionType;
  onClose?: (data: any) => void;
  onSubmit?: (data: any) => void;
}

function handleEditOpenModal(
  modalRef: React.RefObject<HTMLDialogElement | null>,
  row: Record<string, any>,
  setter: (row: Record<string, any>) => void,
) {
  setter(row);
  if (modalRef.current) {
    modalRef.current.showModal();
  } else {
    console.error("Modal element not found");
  }
}

function handleOpenModal(modalRef: React.RefObject<HTMLDialogElement | null>) {
  if (modalRef.current) {
    modalRef.current.showModal();
  } else {
    console.error("Modal element not found");
  }
}

function InputFormModal({
  id,
  ref,
  title,
  inputs,
  action,
  onClose,
  onSubmit,
}: InputFormModalProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (onSubmit) {
      onSubmit(formData); // Trigger parent callback with formData
    }
    ref.current?.close();
  };

  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle" ref={ref}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <form id={`${id}-form`} onSubmit={handleSubmit}>
          {inputs.map((input, index) => {
            switch (input.type) {
              case "hidden":
                return (
                  <input
                    key={index}
                    name={input.label.toLowerCase()}
                    type="hidden"
                    defaultValue={input.value}
                  />
                );
              case "date":
                return (
                  <label key={index} className="input mb-4 w-full">
                    <span className="label">{input.label}</span>
                    <input
                      type="date"
                      name={input.label.toLowerCase()}
                      defaultValue={input.value}
                    />
                  </label>
                );
              case "select":
                return (
                  <label key={index} className="select mb-4 w-full">
                    <span className="label">{input.label}</span>
                    <select
                      key={`${input.label}-${input.value}`}
                      name={input.label.toLowerCase()}
                      defaultValue={input.value}
                      className="select"
                    >
                      {input.options.map((option, optIndex) => (
                        <option key={optIndex} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                );
              default:
                return (
                  <label key={index} className="floating-label">
                    <span>{input.label}</span>
                    <input
                      type={input.type}
                      name={input.label.toLowerCase()}
                      placeholder={input.label}
                      defaultValue={input.value}
                      step={input.type === "number" ? "0.01" : undefined}
                      className="input input-md mb-4 w-full"
                    />
                  </label>
                );
            }
          })}
          <span className="flex gap-2">
            <button
              className="btn flex-auto"
              form={`${id}-backdrop`}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary flex-auto"
              type="submit"
              form={`${id}-form`}
            >
              {action}
            </button>
          </span>
        </form>
      </div>
      <form id={`${id}-backdrop`} method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export { handleEditOpenModal, handleOpenModal };
export default InputFormModal;
