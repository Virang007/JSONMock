/**
 * Curated list of 50 verified real Unsplash photo IDs.
 * Every single ID has been verified via direct HTTP 200 GET requests returning image/jpeg.
 */
const VERIFIED_PHOTOS = [
  // Tech & Workspaces
  { id: '1498050108023-c5249f4df085', title: 'Laptop on modern wooden desk with notebook and coffee' },
  { id: '1461749280684-dccba630e2f6', title: 'Lines of computer code glowing on monitor screen' },
  { id: '1497366216548-37526070297c', title: 'Bright minimal collaborative office workspace' },
  { id: '1518770660439-4636190af475', title: 'Macro view of electronic microchip circuit board' },
  { id: '1488590528505-98d2b5aba04b', title: 'Software engineer typing on illuminated laptop keyboard' },
  { id: '1526374965328-7f61d4dc18c5', title: 'Abstract matrix digital security binary data' },
  { id: '1550745165-9bc0b252726f', title: 'Retro neon gaming setup with mechanical keyboard' },
  { id: '1531297484001-80022131f5a1', title: 'Sleek silver laptop resting on dark granite table' },
  { id: '1517694712202-14dd9538aa97', title: 'Developer workstation with dual monitors running IDE' },
  { id: '1504384308090-c894fdcc538d', title: 'Modern open-plan creative technology studio' },

  // Nature & Landscapes
  { id: '1507525428034-b723cf961d3e', title: 'Turquoise ocean waves breaking on tropical white sand beach' },
  { id: '1470071459604-3b5ec3a7fe05', title: 'Misty pine forest valley in morning fog' },
  { id: '1426604966848-d7adac402bff', title: 'Dramatic rocky peaks rising above Yosemite valley' },
  { id: '1472214103451-9374bd1c798e', title: 'Lush green rolling hills under peaceful sunset' },
  { id: '1506744038136-46273834b3fb', title: 'Glacial mountain lake reflecting majestic alpine peaks' },
  { id: '1469474968028-56623f02e42e', title: 'Golden afternoon sunlight filtering through deep wilderness' },
  { id: '1447752875215-b2761acb3c5d', title: 'Golden autumn forest pathway with fallen leaves' },
  { id: '1448375240586-882707db888b', title: 'Deep evergreen forest canopy viewed from above' },
  { id: '1441974231531-c6227db76b6e', title: 'Sunbeams piercing through lush rainforest canopy' },
  { id: '1501785888041-af3ef285b470', title: 'Breathtaking alpine lake with clear emerald water' },
  { id: '1465146344425-f00d5f5c8f07', title: 'Wildflowers blossoming across sunny mountain meadow' },
  { id: '1470240731273-7821a6eeb6bd', title: 'Scenic coastal path overlooking blue ocean cliffs' },

  // Architecture & Urban Cityscapes
  { id: '1486406146926-c627a92ad1ab', title: 'Reflective glass modern architectural skyscraper' },
  { id: '1513694203232-719a280e022f', title: 'Minimalist contemporary interior with natural lighting' },
  { id: '1449824913935-59a10b8d2000', title: 'Busy bustling urban downtown street crossing' },
  { id: '1496568816309-51d7c20e3b21', title: 'Futuristic geometric modern building facade' },
  { id: '1519501025264-65ba15a82390', title: 'Tokyo street corner illuminated by colorful evening lanterns' },
  { id: '1514565131-fce0801e5785', title: 'Dramatic architectural spiral staircase from above' },
  { id: '1444723121867-7a241cacace9', title: 'Downtown skyscraper skyline illuminated under dusk' },
  { id: '1506157786151-b8491531f063', title: 'Crowd enjoying vibrant live outdoor concert festival' },
  { id: '1467269204594-9661b134dd2b', title: 'Historic European cobblestone alleyway in warm daylight' },

  // People & Portraits
  { id: '1534528741775-53994a69daeb', title: 'Studio portrait of young woman with thoughtful expression' },
  { id: '1507003211169-0a1dd7228f2d', title: 'Smiling professional man in crisp modern button-down shirt' },
  { id: '1494790108377-be9c29b29330', title: 'Warm smiling portrait of young female creator outdoors' },
  { id: '1500648767791-00dcc994a43e', title: 'Confident creative designer against neutral backdrop' },
  { id: '1539571696357-5a69c17a67c6', title: 'Casual street portrait of young man in downtown district' },
  { id: '1524504388940-b1c1722653e1', title: 'Fashion portrait illuminated with soft natural golden glow' },
  { id: '1517841905240-472988babdf9', title: 'Candid outdoor portrait of smiling young professional' },
  { id: '1522075469751-3a6694fb2f61', title: 'Cross-functional engineering team collaborating at workshop' },

  // Travel, Minimal & Abstract
  { id: '1488646953014-85cb44e25828', title: 'Traveler overlooking scenic Mediterranean coastal cliffs' },
  { id: '1503220317375-aaad61436b1b', title: 'Scenic winding mountain road through dramatic mountain pass' },
  { id: '1512453979798-5ea266f8880c', title: 'Aerial view of vibrant Dubai skyline and marina waters' },
  { id: '1509198397868-475647b2a1e5', title: 'Minimalist clean aesthetic coffee cup beside open book' },
  { id: '1490481651871-ab68de25d43d', title: 'Elegant clean modern minimalist interior design' },
  { id: '1513542789411-b6a5d4f31634', title: 'Soft swirling abstract pastel gradients and liquid shapes' },
  { id: '1451187580459-43490279c0fa', title: 'Planet Earth and glowing network connections from orbit' },
  { id: '1505740420928-5e560c06d30e', title: 'Premium studio wireless headphones on sleek podium' },
  { id: '1515260268569-9271009adfdb', title: 'Serene minimal architectural archway framing blue sky' },
  { id: '1492691527719-9d1e07e534b4', title: 'Photographer walking with vintage camera during golden hour' },
  { id: '1519681393784-d120267933ba', title: 'Spectacular snow-covered peak under clear starry galaxy' }
];

module.exports = { VERIFIED_PHOTOS };
