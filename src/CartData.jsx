import React from "react";
import { Typography } from "@material-tailwind/react";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

const CartData = ({ item, updateQuantity, removeItem }) => {
  return (
    <div className="flex items-start justify-between border-b border-gray-300 py-4">
      <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-md" />

      <div className="flex flex-col flex-grow ml-4">
        <Typography variant="small" className="uppercase text-gray-500 tracking-wide text-xs">
          KRACKED STUDIOS
        </Typography>
        <Typography variant="small" className="font-semibold text-black">
          {item.name}
        </Typography>
        <Typography variant="small" className="text-gray-500">
          LE {item.price.toFixed(2)}
        </Typography>
        <Typography variant="small" className="text-gray-500">
          Size: {item.size}
        </Typography>

        <div className="flex items-center gap-3 mt-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="p-1 border rounded-full w-8 h-8 flex items-center justify-center"
          >
            <MinusIcon className="w-4 h-4 text-gray-600" />
          </button>
          <Typography variant="small" className="text-black text-lg">{item.quantity}</Typography>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-1 border rounded-full w-8 h-8 flex items-center justify-center"
          >
            <PlusIcon className="w-4 h-4 text-gray-600" />
          </button>
          <button onClick={() => removeItem(item.id)} className="text-gray-500 ml-2">
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <Typography variant="small" className="font-semibold text-black">
        LE {(item.price * item.quantity).toFixed(2)}
      </Typography>
    </div>
  );
};

export default CartData;
