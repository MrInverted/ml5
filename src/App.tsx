import { useML5 } from "@/hooks/useML5";
import { Button } from "@/ui/Button";
import { ImageClassesList } from "@/components/ImageClassesList";
import { Predictor } from "./components/Predictor";



function App() {
  const { isLoading, isTrained, onTryGetImages } = useML5();

  console.log("App: render")

  return (
    <div className='max-w-5xl w-full mx-auto p-5 min-h-svh'>
      <div className="flex flex-col gap-10">
        <h1 className="text-2xl font-bold text-center">ML5.js Image classifier</h1>

        <ImageClassesList />

        {!isTrained &&
          <div>
            <Button variant="blue" onClick={() => onTryGetImages()} disabled={isLoading}>
              {isLoading ? "Loading..." : "Teach ML!"}
            </Button>
          </div>
        }

        <Predictor />
      </div>
    </div >
  )
}

export default App
