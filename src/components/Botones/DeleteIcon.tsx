import React from "react";
import { Button } from "@nextui-org/react";
import { MdDelete } from "react-icons/md";
import swal from 'sweetalert';

const mostrarAlerta1 = () => {
  swal({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    buttons: {
      cancel: {
        text: "Cancel",
        value: null,
        visible: true,
        className: "",
        closeModal: true,
      },
      confirm: {
        text: "Yes, delete it!",
        value: true,
        visible: true,
        className: "",
        closeModal: false
      }
    }
  }).then((value) => {
    if (value) {
      swal({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });
}
  
export default function App() {
  return (
    <Button onClick={mostrarAlerta1} className="bg-red-600 text-white">
      <MdDelete /> Eliminar
    </Button>
  );
}
