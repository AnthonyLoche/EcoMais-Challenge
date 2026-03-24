import loading_gif from "../../assets/images/loading.gif";

export default function ComingSoon() {
  return (
    <div className="w-full h-[50vh] flex flex-col items-center justify-center gap-2">
      <img
        src={loading_gif}
        alt="Em breve"
        className="w-[30%] object-contain"
      />
      <span className="font-semibold text-green-500">Em Breve!</span>
      <p className="text-sm text-gray-400 text-center">
        A equipe da <span className="font-semibold text-green-500">Eco+</span> ainda está trabalhando nisso :)
      </p>
    </div>
  );
}