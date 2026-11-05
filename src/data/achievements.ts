export type Achievement = {
  year: string
  title: string
  detail: string
  champion?: boolean
}

export const achievements: Achievement[] = [
  { year: '2015', title: 'Talentadong Pinoy', detail: 'Contender' },
  {
    year: '2017',
    title: "Claveria's Got Talent, Season 1",
    detail: '1st Grand Champion',
    champion: true,
  },
  { year: '2019', title: 'Tawag ng Tanghalan', detail: 'Daily Contender' },
  { year: '2021', title: 'Little Big Star', detail: 'Contender' },
  {
    year: '2026',
    title: 'Karantahan sa Boulevard, Season 1',
    detail: '1st Grand Champion',
    champion: true,
  },
]
