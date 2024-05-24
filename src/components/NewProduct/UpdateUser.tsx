import React from 'react';
import swal from 'sweetalert';

const mostrarAlerta = () => {
  swal({
    title: "Good job!",
    text: "You clicked the button!",
    icon: "success"
  })
}
const FormField = ({ label, id, type, required = false }) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium ">
        {label}{required && ' *'}
      </label>
      <input type={type} id={id} name={id} required={required} className="bg-zinc-700 w-full mt-1 p-2 rounded border border-zinc-600" />
    </div>
  );
};

const CreateUserForm = ({ children, open, close }) => {
  return (
    <>
      {open &&
        <div className="relative ml-[5px] mt-[-190px]">
          <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
          <div className="bg-zinc-800 text-white p-6 max-w-sm mx-auto rounded-lg mt-[-60px] relative z-20">
            <h2 className="text-lg font-semibold mb-4">Create Upate Product</h2>
            <form>
              <FormField label="Id" id="id" type="text" />
              <FormField label="Nombre del Producto" id="product-name" type="text" required />
              <FormField label="Codigo Producto" id="product-code" type="text" required />
              <div className="mb-4">
                <label htmlFor="quantity" className="block text-sm font-medium">Cantidad *</label>
                <input type="number" id="quantity" name="quantity" required className="bg-zinc-700 w-full mt-1 p-2 rounded border border-zinc-600" />
              </div>
              <div className="mb-4">
                <label htmlFor="state" className="block text-sm font-medium">State</label>
                <select id="state" name="state" className="bg-zinc-700 w-full mt-1 p-2 rounded border border-zinc-600">
                  <option value="">Seleccione una categoría</option>
                  <option value="celulares">Celulares</option>
                  <option value="audifonos">Audífonos</option>
                  <option value="fundas">Fundas</option>
                  <option value="cargadores">Cargadores</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button onClick={() => close(false)} type="button" className="bg-zinc-600 hover:bg-zinc-700 text-white px-4 py-2 rounded">Cancel</button>
                <button onClick={() => mostrarAlerta()} type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">Save</button>
              </div>
            </form>
            {children}
          </div>
        </div>


      }
    </>
  );
};

export default CreateUserForm;
