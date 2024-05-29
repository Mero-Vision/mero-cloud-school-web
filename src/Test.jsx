import React from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";

let renderCount = 0;

export default function Test() {
  const methods = useForm({
    defaultValues: {
      amount: 50,
      test: [100, 200, 300],
    },
  });
  const { handleSubmit, watch, register, formState } = methods;

  const onSubmit = (data) => console.log("data", data);

  renderCount++;

  const allWatchedValues = watch({ nest: true });

  console.log("[allWatchedValues]", allWatchedValues);
  //console.log("[formState touched]", formState.touched);
  //console.log("[formState dirtyFields]", [...formState.dirtyFields]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Regular Fields</h2>
        <label>
          Amount
          <input type="text" name="amount" {...register("amount")} />
        </label>
        <h2>Field Array </h2>
        <p>The following demo allow you to delete, append, prepend items</p>
        <span className="counter">Render Count: {renderCount}</span>
        <Fields />
        <input type="submit" />
      </form>
    </FormProvider>
  );
}

function Fields() {
  const { control, register, watch } = useFormContext();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "test",
    }
  );
  //const watchJustTestValue = watch("test");
  //console.log("watchJustTestValue", watchJustTestValue);
  return (
    <>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <input
                name={`test[${index}]`}
                ref={register()}
                defaultValue={item.name}
              />
              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>

      <section>
        <button
          type="button"
          onClick={() => {
            append({ name: 50 });
          }}
        >
          append
        </button>
        <button type="button" onClick={() => prepend({ name: "prepend" })}>
          prepend
        </button>
        <button
          type="button"
          onClick={() => insert(parseInt(2, 10), { name: "insert" })}
        >
          insert at
        </button>

        <button type="button" onClick={() => swap(1, 2)}>
          swap
        </button>

        <button type="button" onClick={() => move(1, 4)}>
          move
        </button>

        <button type="button" onClick={() => remove(1)}>
          remove at
        </button>
      </section>
    </>
  );
}
