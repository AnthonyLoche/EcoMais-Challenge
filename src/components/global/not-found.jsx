import loading_gif from "../../assets/images/loading.gif";
import { Link } from "react-router-dom";

export default function ComingSoon() {
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center gap-2">
      <img
        src={loading_gif}
        alt="Em breve"
        className="w-[30%] object-contain"
      />
      <span className="font-semibold text-green-500">Não Encontrado 404!</span>
      <p className="text-sm text-gray-400 text-center">
        A url que você tentou acessar não existe ou foi movida. Verifique se digitou corretamente ou volte para a página inicial.
      </p>
      <Link to="/" className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
        Voltar para Home
      </Link>
    </div>
  );
}