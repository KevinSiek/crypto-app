
import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: 'AIzaSyCDnS77YX_ITIavwrXxvlWIalO4JiyUa2M',
  authDomain: 'crypto-watchlist-app.firebaseapp.com',
  projectId: 'crypto-watchlist-app',
  storageBucket: 'crypto-watchlist-app.appspot.com',
  messagingSenderId: '567951441784',
  appId: '1:567951441784:web:107d625a825554755a528d',
  measurementId: 'G-8MHX07C4T3'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {
  db
}