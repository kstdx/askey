import Provider from '../components/Provider.jsx'
import Askey from '../islands/Askey.jsx'
import { questions } from '../components/data.js'

export default () => (
    <Provider>
        <Askey questions={questions.sort(() => Math.random() - 0.5)} />
    </Provider>
)
