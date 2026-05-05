import Image from "next/image";

interface PorductCardProps {
  name: string;
  price: number;
  image: string;
}

export const ProductCard: React.FC<PorductCardProps> = ({
  name,
  price,
  image,
}) => (
  <div className="group bg-brandCard border border-gray-800 p-4 rounded-xl hover:border-brandAccent/50 transition-all cursor-pointer">
    <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-black/20">
      <Image
        src={image}
        alt={name}
        className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300"
      />
    </div>
    <h3 className="text-brandText font-semibold text-lg">{name}</h3>
    <p className="text-brandAccent font-bold text-xl mt-2">${price}</p>
    <button className="w-full mt-4 bg-white/5 hover:bg-brandAccent text-white py-2 rounded-lg transition-colors text-sm font-medium">
      Consultar por WhatsApp
    </button>
  </div>
);
