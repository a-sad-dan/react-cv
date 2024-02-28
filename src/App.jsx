import './App.css';
import Resume from './components/Resume';
import SectionButton from './components/SectionButton';

import about from './assets/user(1).svg';
import interests from './assets/heart.svg';
import education from './assets/book.svg';
import languages from './assets/globe.svg';
import skills from './assets/key.svg';
import experience from './assets/clock.svg';
import achievements from './assets/award.svg';
import download from './assets/download.svg';

import dummyData from './components/dummyData';

function App() {
	return (
		<>
			<div className='sidebar'>
				<SectionButton icon={about} />
				<SectionButton icon={languages} />
				<SectionButton icon={skills} />
				<SectionButton icon={interests} />
				<SectionButton icon={education} />
				<SectionButton icon={experience} />
				<SectionButton icon={achievements} />
				<SectionButton icon={download} />
			</div>
			<div className='form-div'></div>
			<Resume data={dummyData} />
		</>
	);
}

export default App;
