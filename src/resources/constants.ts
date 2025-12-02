
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
	github: string;
	linkedIn: string;
	email: string;
	cv: string
}

const CV_FILE_ID = "1BCEQGue_kECo2KJZ_qZm8V3KoYtDD0nO"

export const LINKS: Links = {
	github: "https://github.com/JeremyAyza",
	linkedIn: "https://linkedin.com/in/JeremyAyza",
	email: "mailto:jeremy.ayza@gmail.com",
	cv: getLinkDownloadDrive(CV_FILE_ID)
}

function getLinkDownloadDrive(fileId: string): string {
	// Formato de enlace de descarga directa
	return `https://drive.google.com/uc?export=download&id=${fileId}`;

}
