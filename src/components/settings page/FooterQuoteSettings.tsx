import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

const FooterQuoteSettings = () => {
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    const savedQuote = localStorage.getItem("footerQuote")
    if (savedQuote !== null) {
      setInputValue(savedQuote)
    }
  }, [])

  const dispatchQuoteUpdate = () => {
    window.dispatchEvent(new Event("quoteUpdated"))
  }

  const handleAdd = () => {
    localStorage.setItem("footerQuote", inputValue)
    dispatchQuoteUpdate()
  }

  const handleReset = () => {
    const defaultQuote = "Omnes una manet nox"
    setInputValue(defaultQuote)
    localStorage.setItem("footerQuote", defaultQuote)
    dispatchQuoteUpdate()
  }

  return (
    <div className="mt-6">
      <label className="block font-medium text-gray-300 mb-1">Add a Footer Quote</label>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border px-2 py-1 mr-2 rounded"
      />
      <Button
        onClick={handleAdd}
        className="mr-2"
      >
        Add
      </Button>
      <Button
        onClick={handleReset}
        variant="destructive"
      >
        Reset to default
      </Button>
    </div>
  )
}

export default FooterQuoteSettings