import {
    ActionFunctionArgs,
    Form,
    redirect,
    useFetcher,
    useNavigate,
} from "react-router-dom";
import { Product } from "../types";
import { formatCurrency } from "../utils";
import { deleteProduct } from "../services/ProductService";

type ProductDetailsProps = {
    product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
    if (params.id !== undefined) {
        await deleteProduct(+params.id);
        return redirect("/");
    }
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const fetcher = useFetcher();

    const navigate = useNavigate();

    const isAvailable = product.availability;

    return (
        <tr className="border-b text-center">
            <td className="p-2 text-lg text-gray-800 text-left">
                {product.name}
            </td>
            <td className="p-2 text-lg text-gray-800 text-right">
                {formatCurrency(product.price)}
            </td>

            <td className="p-2 text-lg text-gray-800">
                <fetcher.Form action="" method="POST">
                    <button
                        type="submit"
                        name="id"
                        value={product.id}
                        className={`${isAvailable ? "text-black" : "text-red-600"} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 hover:cursor-pointer`}
                    >
                        {isAvailable ? "Disponible" : "No disponible"}
                    </button>
                </fetcher.Form>
                {/* {isAvailable ? "Disponible" : "No disponible"} */}
            </td>
            <td className="p-2 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    {/* <Link
                        to={`/productos/${product.id}/editar`}
                        className="bg-slate-700 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center hover:bg-slate-600"
                    >
                        Editar
                    </Link> */}

                    {/* <button
                        onClick={() => navigate(`/productos/${product.id}/editar`, {
                            state: {
                                product
                            }
                        })}
                        className="bg-slate-700 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center hover:bg-slate-600"
                    >
                        Editar
                    </button> */}

                    <button
                        onClick={() =>
                            navigate(`/productos/${product.id}/editar`)
                        }
                        className="bg-slate-700 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center hover:bg-slate-600"
                    >
                        Editar
                    </button>

                    <Form
                        className="w-full"
                        method="POST"
                        action={`productos/${product.id}/eliminar`}
                        onSubmit={(e) => {
                            if (
                                !confirm(
                                    "¿Estás seguro de eliminar el producto?"
                                )
                            ) {
                                e.preventDefault();
                            }
                        }}
                    >
                        <input
                            type="submit"
                            className="bg-red-700 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center hover:bg-red-600"
                            value="Eliminar"
                        />
                    </Form>
                </div>
            </td>
        </tr>
    );
}
