// store/cardSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import CardOne from "@/assets/svgs/card-one.svg";
import CardTwo from "@/assets/svgs/card-two.svg";
import CardThree from "@/assets/svgs/card-three.svg";
import CardFour from "@/assets/svgs/card-four.svg";
import CardFive from "@/assets/svgs/card-five.svg";
import CardSix from "@/assets/svgs/card-six.svg";
import CardSeven from "@/assets/svgs/card-seven.svg";
import CardEight from "@/assets/svgs/card-eight.svg";
import CardUn from "@/assets/svgs/hilton.svg"
import CardDeux from "@/assets/svgs/marriot.svg"
import CardTroix from "@/assets/svgs/monty_suites_logo.png.svg"
import CardQuatre from "@/assets/svgs/four-seasons.svg"
import CardCinq from "@/assets/svgs/ritz.svg"
import CardSixx from "@/assets/svgs/mayfair.svg"
import CardSept from "@/assets/svgs/lukman.svg"
import CardHuit from "@/assets/svgs/lane.svg"
import VectorOne from "@/assets/svgs/Vector.svg"
import VectorTwo from "@/assets/svgs/vectortwo.svg"
import VectorThree from "@/assets/svgs/vectorthree.svg"
import VectorFour from "@/assets/svgs/vectorFour.svg"

interface Card {
  id: number;
  title: string;
  image: string;
}
interface CardCarou {
  id: number;
  title: string;
  description: string;
}

interface CardState {
  cards: Card[];
  cardsDuo: Card[];
  cardsCarousel: CardCarou[];
  cardsCarouseltwo: CardCarou[];
}

const initialState: CardState = {
  cards: [
    { id: 1, title: "Card One", image: CardOne },
    { id: 2, title: "Card Two", image: CardTwo },
    { id: 3, title: "Card Three", image: CardThree },
    { id: 4, title: "Card Four", image: CardFour },
    { id: 5, title: "Card Five", image: CardFive },
    { id: 6, title: "Card Six", image: CardSix },
    { id: 7, title: "Card Seven", image: CardSeven },
    { id: 8, title: "Card Eight", image: CardEight },
  ],
    cardsDuo: [
    { id: 1, title: "Card One", image: CardUn },
    { id: 2, title: "Card Two", image: CardDeux },
    { id: 3, title: "Card Three", image: CardTroix },
    { id: 4, title: "Card Four", image: CardQuatre },
    { id: 5, title: "Card Five", image: CardCinq },
    { id: 6, title: "Card Six", image: CardSixx },
    { id: 7, title: "Card Seven", image: CardSept },
    { id: 8, title: "Card Eight", image: CardHuit },
  ],
  cardsCarousel: [
    { id: 1, title: VectorOne, description: "I found my dream space. The reminders, document upload, and chat features saved me so much time. It really feels like this app was built with renters in mind." },
    { id: 2, title: VectorTwo, description: "  I found my dream space. The reminders, document upload, and chat features saved me so much time. It really feels like this app was built with renters in mind." },
    { id: 3, title: VectorThree, description: " I found my dream space. The reminders, document upload, and chat features saved me so much time. It really feels like this app was built with renters in mind." },
    { id: 4, title: VectorFour, description: " I found my dream space. The reminders, document upload, and chat features saved me so much time. It really feels like this app was built with renters in mind." },
  ],
    cardsCarouseltwo: [
    { id: 1, title: VectorOne, description: "I found my dream space. The reminders, document upload, and chat features saved me so much time. It really feels like this app was built with renters in mind." },
    { id: 2, title: VectorTwo, description: "  I found my dream space. The reminders, document upload, and chat features saved me so much time. It really feels like this app was built with renters in mind." },
    { id: 3, title: VectorThree, description: " I found my dream space. The reminders, document upload, and chat features saved me so much time. It really feels like this app was built with renters in mind." },
    { id: 4, title: VectorFour, description: " I found my dream space. The reminders, document upload, and chat features saved me so much time. It really feels like this app was built with renters in mind." },
  ],
};

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {},
});

export default cardSlice.reducer;
