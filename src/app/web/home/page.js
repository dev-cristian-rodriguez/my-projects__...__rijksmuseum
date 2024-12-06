export default function Home() {
  return (
    <aside
      style={{
        background:
          "url(https://www.artnews.com/wp-content/uploads/2023/02/GettyImages-1215971600-copy-1.jpg?w=1200)",
        backgroundSize: "cover",
        marginTop: "-10px",
        backgroundPosition: "center",
        opacity: "0.9",
      }}
      className="flex justify-center w-[100%] h-[100vh]"
    >
      <div className="flex justify-center flex-col w-[500px] mx-4 h-[250px] border shadow-[0_0_60px_rgba(0,0,0,0.7)] bg-white text-center mt-[200px] p-5 rounded-[10px] border-solid border-[#ddd]">
        <h1 title="error" className="text-[25px] text-[#333] font-semibold">
          Rijksmuseum
        </h1>
        <p title="message" className="text-[15px] text-[#777] mt-[20px]">
          Museo nacional en Ámsterdam, Países Bajos, que alberga una vasta
          colección de arte y artefactos históricos, incluyendo obras maestras
          de artistas como Rembrandt y Vermeer.
        </p>
      </div>
    </aside>
  );
}
