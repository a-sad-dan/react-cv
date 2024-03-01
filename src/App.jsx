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

import domtoimage from 'dom-to-image';

import { useState } from 'react';

import './form.css';

function App() {
	const handleDownloadPDF = () => {
		const node = document.getElementById('resume');

		domtoimage
			.toPng(node, { quality: 1.0 })
			.then(function (dataUrl) {
				const link = document.createElement('a');
				link.download = 'resume.png';
				link.href = dataUrl;
				link.click();
			})
			// .then(function (dataUrl) {
			// 	const pdf = new jsPDF('p', 'in', 'letter'); // Portrait, inches, letter size
			// 	pdf.addImage(dataUrl, 'PNG', 0, 0, 8.5, 11); // Add image at full letter size
			// 	pdf.save('resume.pdf');
			// })
			.catch(function (error) {
				console.error('Error capturing node:', error);
			});
	};

	const [resumeData, setResumeData] = useState(dummyData);

	const handleFormSubmit = (e) => {
		e.preventDefault();
		console.log('Tried form submit');
	};

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
				<SectionButton
					icon={download}
					onPress={handleDownloadPDF}
				/>
			</div>
			<div className='form-div'>
				<form
					id='resume-form'
					onSubmit={handleFormSubmit}
				>
					<section
						id='about'
						className='form-section'
					>
						<p className='section-label x-large bold'>About</p>
						<div className='form-row'>
							<label>
								First Name
								<input
									type='text'
									name='firstName'
									placeholder={resumeData.firstName}
									onChange={(e) => {
										setResumeData({
											...resumeData,
											firstName: e.target.value,
										});
									}}
								/>
							</label>

							<label>
								Last Name
								<input
									type='text'
									name='lastName'
									placeholder={resumeData.lastName}
									onChange={(e) => {
										setResumeData({ ...resumeData, lastName: e.target.value });
									}}
								/>
							</label>
						</div>
						<div className='form-row'>
							<label>
								Job Position
								<input
									type='text'
									name='position'
									placeholder={resumeData.position}
									onChange={(e) => {
										setResumeData({
											...resumeData,
											position: e.target.value,
										});
									}}
								/>
							</label>
						</div>
						<div className='form-row'>
							<label>
								Address
								<input
									type='text'
									placeholder={resumeData.contact.address}
									name='address'
									onInput={(e) => {
										const newContact = resumeData.contact;
										newContact.address = e.target.value;
										setResumeData({ ...resumeData, contact: newContact });
									}}
								/>
							</label>
						</div>
						<div className='form-row'>
							<label>
								Email
								<input
									type='text'
									placeholder={resumeData.contact.email}
									onInput={(e) => {
										const newContact = resumeData.contact;
										newContact.email = e.target.value;
										setResumeData({ ...resumeData, contact: newContact });
									}}
								/>
							</label>
							<label>
								Phone Number
								<input
									name='phone'
									type='text'
									placeholder={resumeData.contact.phone}
									onInput={(e) => {
										const newContact = resumeData.contact;
										newContact.phone = e.target.value;
										setResumeData({ ...resumeData, contact: newContact });
									}}
								/>
							</label>
						</div>
						<div className='form-row'>
							<label>
								Links
								<div className='link-inputs'>
									{resumeData.links.map((link, index) => (
										<div
											key={index}
											className='link-row'
										>
											<input
												type='text'
												name='link'
												placeholder={link}
												onInput={(e) => {
													let linksArr = resumeData.links;
													linksArr[index] = e.target.value;
													setResumeData({ ...resumeData, links: linksArr });
												}}
											/>
											<button
												onClick={() => {
													let linksArr = resumeData.links;
													linksArr.splice(index, 1);
													setResumeData({
														...resumeData,
														links: linksArr,
													});
												}}
											>
												⊘
											</button>
										</div>
									))}
								</div>
							</label>
						</div>
						<button
							className='action-button x-small'
							onClick={() => {
								let linkArr = resumeData.links;
								linkArr.push('');
								setResumeData({ ...resumeData, links: linkArr });
							}}
						>
							Add Link +
						</button>
						<div className='form-row'>
							<label>
								About Me
								<textarea
									rows='3'
									onInput={(e) => {
										setResumeData({
											...resumeData,
											about: e.target.value,
										});
									}}
								></textarea>
							</label>
						</div>
					</section>
				</form>
			</div>
			<Resume data={resumeData} />
		</>
	);
}

export default App;
