import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

// Obtener el directorio actual utilizando import.meta.url
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Ruta a los SVG
const dirPath = path.join(__dirname, "src/assets/simple-icons")

const updateSVGFiles = () => {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error("Error al leer el directorio:", err)
      return
    }

    // Solo archivos SVG
    const svgFiles = files.filter((file) => file.endsWith(".svg"))

    svgFiles.forEach((file) => {
      const filePath = path.join(dirPath, file)

      fs.readFile(filePath, "utf-8", (err, data) => {
        if (err) {
          console.error(`Error al leer el archivo ${file}:`, err)
          return
        }

        let updatedData = data

        // -------------------------------------------------------------------
        // 1. Agregar {...Astro.props} justo después de <svg
        // -------------------------------------------------------------------

        if (!updatedData.includes("{...Astro.props}")) {
          updatedData = updatedData.replace(
            /<svg([^>]*)>/i,
            (_match, attrs) => `<svg${attrs} {...Astro.props}>`
          )
        }

        // -------------------------------------------------------------------
        // 2. Agregar fill="currentColor" a <path> si no lo tiene
        // -------------------------------------------------------------------
        updatedData = updatedData.replace(
          /<path(?![^>]*fill="[^"]*")/g,
          '<path fill="currentColor"'
        )

        // -------------------------------------------------------------------
        // 3. Nuevo nombre → [name].icon.astro
        // -------------------------------------------------------------------
        const baseName = path.basename(file, ".svg")
        const newFileName = `${baseName}.icon.astro`
        const newFilePath = path.join(dirPath, newFileName)

        // -------------------------------------------------------------------
        // 4. Escribir el nuevo archivo
        // -------------------------------------------------------------------
        fs.writeFile(newFilePath, updatedData, "utf-8", (err) => {
          if (err) {
            console.error(`Error al escribir ${newFileName}:`, err)
          } else {
            console.log(`✔ Archivo convertido: ${newFileName}`)
          }
        })

        // -------------------------------------------------------------------
        // 5. Eliminar el archivo original .svg
        // -------------------------------------------------------------------
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`❌ Error al borrar ${file}:`, err)
          } else {
            console.log(`🗑 Archivo original eliminado: ${file}`)
          }
        })
      })
    })
  })
}

// Ejecutar
updateSVGFiles()
