import carpentery from "./images/professions/carpentery.jpg"
import wallPainting from "./images/professions/wall-painting.jpg"
import carMechanics from "./images/professions/car-mechanics.jpg"
import plumbing from "./images/professions/plumbing.jpg"
import electricalWork from "./images/professions/electrical-work.jpg"
import airConditioning from "./images/professions/air-conditioning.jpg"
import aluminumFrames from "./images/professions/aluminum-frames.jpg"
import floors from "./images/professions/floors.jpg"
import satelliteDishSystems from "./images/professions/satallite-dish-systems.jpg"
import electronicRepair from "./images/professions/electronic-repair.jpg"
import cranes from "./images/professions/cranes.jpg"
import carTowing from "./images/professions/car-towing.jpg"
import carBodyWork from "./images/professions/car-body-work.jpg"
import soundSystems from "./images/professions/sound-systems.jpg"
import crafts from "./images/professions/crafts.jpg"

const cities = [
	"الإسكندرية",
	"الإسماعيلية",
	"أسوان",
	"أسيوط",
	"الأقصر",
	"البحر الأحمر",
	"البحيرة",
	"بني سويف",
	"بورسعيد",
	"جنوب سيناء",
	"الجيزة",
	"الدقهلية",
	"دمياط",
	"سوهاج",
	"السويس",
	"الشرقية",
	"شمال سيناء",
	"الغربية",
	"الفيوم",
	"القاهرة",
	"القليوبية",
	"قنا",
	"كفر الشيخ",
	"مطروح",
	"المنوفية",
	"المنيا",
	"الوادي الجديد"
]
const professions = [
	"نجارة",
	"نقاشة",
	"ميكانيكا سيارات",
	"سباكة",
	"كهرباء",
	"تكييف وتبريد",
	"ألوميتال",
	"تركيب أرضيات",
	"أنظمة دش",
	"تصليح أدوات منزلية",
	"نقل ورفع الموبيليا",
	"قطر السيارات",
	"سمكرة سيارات",
	"أنظمة صوت",
	"صناعات يدوية"
]
const professionPictures = [
	{ name: "نجارة", picture: carpentery },
	{ name: "نقاشة", picture: wallPainting },
	{ name: "ميكانيكا سيارات", picture: carMechanics },
	{ name: "سباكة", picture: plumbing },
	{ name: "كهرباء", picture: electricalWork },
	{ name: "تكييف وتبريد", picture: airConditioning },
	{ name: "ألوميتال", picture: aluminumFrames },
	{ name: "تركيب أرضيات", picture: floors },
	{ name: "أنظمة دش", picture: satelliteDishSystems },
	{ name: "تصليح أدوات منزلية", picture: electronicRepair },
	{ name: "نقل ورفع الموبيليا", picture: cranes },
	{ name: "قطر السيارات", picture: carTowing },
	{ name: "سمكرة سيارات", picture: carBodyWork },
	{ name: "أنظمة صوت", picture: soundSystems },
	{ name: "صناعات يدوية", picture: crafts }
]

export function getCities() {
	return cities
}
export function getProfessions() {
	return professions
}
export function getProfessionPictures() {
	return professionPictures
}
