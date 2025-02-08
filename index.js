import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el directorio actual utilizando import.meta.url y convertirlo a ruta de sistema
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta correcta para el directorio
const dirPath = path.join(__dirname, 'src/components/simple-icons');

// Función para añadir fill="currentColor" a los <path> de los archivos SVG
const updateSVGFiles = () => {
	fs.readdir(dirPath, (err, files) => {
		if (err) {
			console.error('Error al leer el directorio:', err);
			return;
		}

		// Filtrar solo los archivos SVG
		// const svgFiles = files.filter(file => file.endsWith('.svg'));

		files.forEach(file => {
			const filePath = path.join(dirPath, file);

			// Leer el contenido del archivo SVG
			fs.readFile(filePath, 'utf-8', (err, data) => {
				if (err) {
					console.error(`Error al leer el archivo ${file}:`, err);
					return;
				}

				// Asegurarse de que todos los <path> tienen fill="currentColor"
				const updatedData = data.replace(/<path(?![^>]*fill="[^"]*")/g, '<path fill="currentColor"');

				// Escribir el contenido actualizado de nuevo en el archivo
				fs.writeFile(filePath, updatedData, 'utf-8', err => {
					if (err) {
						console.error(`Error al escribir el archivo ${file}:`, err);
					} else {
						console.log(`Archivo ${file} actualizado con éxito.`);
					}
				});
			});
		});
	});
};

// Ejecutar la función
updateSVGFiles();
