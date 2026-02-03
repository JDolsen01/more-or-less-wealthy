type InputTypes =
  | "text"
  | "number"
  | "date"
  | "password"
  | "email"
  | "phone"
  | "hidden"
  | "frequency";

interface InputFormModalProps {
  id: string;
  ref: React.Ref<HTMLDialogElement>;
  title: string;
  inputs: {
    label: string;
    type: InputTypes;
    value?: string | number;
  }[];
  onClose?: (data: any) => void;
  onSubmit?: (data: any) => void;
}

function InputFormModal({
  id,
  ref,
  title,
  inputs,
  onClose,
  onSubmit,
}: InputFormModalProps) {
  return (
    <dialog id={id} className="modal modal-bottom sm:modal-middle" ref={ref}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <form id={`${id}-form`} onSubmit={onSubmit}>
          {inputs.map((input, index) => {
            switch (input.type) {
              case "hidden":
                return (
                  <input key={index} type="hidden" defaultValue={input.value} />
                );
              case "date":
                return (
                  <label key={index} className="input mb-4 w-full">
                    <span className="label">{input.label}</span>
                    <input type="date" defaultValue={input.value as string} />
                  </label>
                );
              case "frequency":
                return (
                  <label key={index} className="select mb-4 w-full">
                    <span className="label">{input.label}</span>
                    <select defaultValue={input.value} className="select">
                      <option>Weekly</option>
                      <option>Biweekly</option>
                      <option>Monthly</option>
                      <option>Bimonthly</option>
                      <option>Quarterly</option>
                      <option>Semiannually</option>
                      <option>Annually</option>
                    </select>
                  </label>
                );
              default:
                return (
                  <label key={index} className="floating-label">
                    <span>{input.label}</span>
                    <input
                      type={input.type}
                      placeholder={input.label}
                      defaultValue={input.value}
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
              Add
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

export default InputFormModal;
