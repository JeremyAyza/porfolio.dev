
interface ImageData {
	alt: string;
	src: string;
}

export const PROFILE: ImageData = {
	alt: 'Jeremy Ayza',
	src: '/JeremyAyza.webp'
}


export const ICON_PERU = "🇵🇪"

interface Links {
	gitHub: string;
	linkedIn: string;
	email: string;
	cv: string
}

const CV_FILE_ID = "1soi6pHoNV6zfgH_-2g4RWKmJsyca0Oyo"

export const LINKS: Links = {
	gitHub: "https://github.com/JeremyAyza",
	linkedIn: "https://linkedin.com/in/JeremyAyza",
	email: "mailto:jeremy.ayza@gmail.com",
	cv: getLinkDownloadDrive(CV_FILE_ID)
}

function getLinkDownloadDrive(fileId: string): string {
	// Formato de enlace de descarga directa
	return `https://drive.google.com/uc?export=download&id=${fileId}`;

}
