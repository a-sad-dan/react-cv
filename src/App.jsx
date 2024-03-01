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
import emptyData from '../emptyData';
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

	const scrollToSection = (sectionId) => {
		const section = document.getElementById(sectionId);
		if (section) {
			section.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
		}
	};

	return (
		<>
			<div className='sidebar'>
				<SectionButton
					onPress={() => scrollToSection('about')}
					icon={about}
				/>
				<SectionButton
					onPress={() => scrollToSection('languages')}
					icon={languages}
				/>
				<SectionButton
					onPress={() => scrollToSection('skills')}
					icon={skills}
				/>
				<SectionButton
					onPress={() => scrollToSection('interests')}
					icon={interests}
				/>
				<SectionButton
					onPress={() => scrollToSection('education')}
					icon={education}
				/>
				<SectionButton
					onPress={() => scrollToSection('experience')}
					icon={experience}
				/>
				<SectionButton
					onPress={() => scrollToSection('achievements')}
					icon={achievements}
				/>
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
						<div className='form-row'>
							<button
								className='action-button'
								onClick={() => {
									setResumeData(dummyData);
								}}
							>
								Load Dummy Data
							</button>
							<button
								className='action-button'
								onClick={() => {
									setResumeData(emptyData);
								}}
							>
								Reset All
							</button>
							<input
								type='color'
								onInput={(e) => {
									document.documentElement.style.setProperty(
										'--theme-text',
										e.target.value
									);
								}}
							/>
						</div>
					</section>
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
									placeholder='First Name'
									value={resumeData.firstName}
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
									placeholder='Last Name'
									value={resumeData.lastName}
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
									placeholder='Job Position'
									value={resumeData.position}
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
									placeholder='Address'
									value={resumeData.contact.address}
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
									placeholder='Email'
									value={resumeData.contact.email}
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
									placeholder='Phone'
									value={resumeData.contact.phone}
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
												placeholder='Link'
												value={link}
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
									rows='6'
									placeholder='Hi, I am ...'
									value={resumeData.about}
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

					<section
						id='languages'
						className='form-section'
					>
						<p className='section-label x-large bold'>Languages</p>
						{resumeData.sections[0].languages.map((lang, index) => (
							<div
								className='link-inputs'
								key={index}
							>
								<div className='form-row'>
									<input
										type='text'
										placeholder='Language'
										value={lang.name}
										name='language'
										onChange={(e) => {
											const newSection = resumeData.sections;
											newSection[0].languages[index].name = e.target.value;
											setResumeData({ ...resumeData, sections: newSection });
										}}
									/>
									<input
										type='text'
										placeholder='Proficiency Level'
										name='language'
										value={lang.proficiency}
										onChange={(e) => {
											const newSection = resumeData.sections;
											newSection[0].languages[index].proficiency =
												e.target.value;
											setResumeData({ ...resumeData, sections: newSection });
										}}
									/>
									<button
										onClick={() => {
											let sectionArr = resumeData.sections;
											sectionArr[0].languages.splice(index, 1);
											setResumeData({ ...resumeData, sections: sectionArr });
										}}
									>
										⊘
									</button>
								</div>
							</div>
						))}
						<button
							className='action-button x-small'
							onClick={() => {
								let sectionArr = resumeData.sections;
								sectionArr[0].languages.push({ name: '', proficiency: '' });
								setResumeData({ ...resumeData, sections: sectionArr });
							}}
						>
							Add Language +
						</button>
					</section>

					<section
						id='skills'
						className='form-section'
					>
						<p className='section-label x-large bold'>Skills</p>
						{resumeData.sections[1].skills.map((skill, index) => (
							<div
								className='link-inputs'
								key={index}
							>
								<div className='form-row'>
									<input
										type='text'
										placeholder='Skill'
										value={skill}
										name='language'
										onChange={(e) => {
											const newSection = resumeData.sections;
											newSection[1].skills[index] = e.target.value;
											setResumeData({ ...resumeData, sections: newSection });
										}}
									/>
									<button
										onClick={() => {
											let sectionArr = resumeData.sections;
											sectionArr[1].skills.splice(index, 1);
											setResumeData({ ...resumeData, sections: sectionArr });
										}}
									>
										⊘
									</button>
								</div>
							</div>
						))}
						<button
							className='action-button x-small'
							onClick={() => {
								let sectionArr = resumeData.sections;
								sectionArr[1].skills.push('');
								setResumeData({ ...resumeData, sections: sectionArr });
							}}
						>
							Add Skill +
						</button>
					</section>

					<section
						id='interests'
						className='form-section'
					>
						<p className='section-label x-large bold'>Interests</p>
						{resumeData.sections[2].interests.map((interest, index) => (
							<div
								className='link-inputs'
								key={index}
							>
								<div className='form-row'>
									<input
										type='text'
										placeholder='Interest'
										value={interest}
										name='interest'
										onChange={(e) => {
											const newSection = resumeData.sections;
											newSection[2].interests[index] = e.target.value;
											setResumeData({ ...resumeData, sections: newSection });
										}}
									/>
									<button
										onClick={() => {
											let sectionArr = resumeData.sections;
											sectionArr[2].interests.splice(index, 1);
											setResumeData({ ...resumeData, sections: sectionArr });
										}}
									>
										⊘
									</button>
								</div>
							</div>
						))}
						<button
							className='action-button x-small'
							onClick={() => {
								let sectionArr = resumeData.sections;
								sectionArr[2].interests.push('');
								setResumeData({ ...resumeData, sections: sectionArr });
							}}
						>
							Add Interest +
						</button>
					</section>

					{/* Education Section */}
					<section
						id='education'
						className='form-section'
					>
						<p className='section-label x-large bold'>Education</p>
						{resumeData.sections[3].education.map((edu, index) => (
							<div
								className='link-inputs'
								key={index}
							>
								<div className='form-row'>
									<input
										type='text'
										placeholder='College/School Name'
										value={edu.place}
										name='place'
										onChange={(e) => {
											const newSection = resumeData.sections;
											newSection[3].education[index].place = e.target.value;
											setResumeData({ ...resumeData, sections: newSection });
										}}
									/>
									<input
										type='text'
										placeholder='Name of Degree'
										name='degree'
										value={edu.degree}
										onChange={(e) => {
											const newSection = resumeData.sections;
											newSection[3].education[index].degree = e.target.value;
											setResumeData({ ...resumeData, sections: newSection });
										}}
									/>
								</div>
								<div className='form-row'>
									<input
										type='text'
										className='year-input'
										placeholder='start year'
										name='start'
										value={edu.start}
										onChange={(e) => {
											const newSection = resumeData.sections;
											newSection[3].education[index].start = e.target.value;
											setResumeData({ ...resumeData, sections: newSection });
										}}
									/>
									<input
										type='text'
										className='year-input'
										placeholder='End / Current'
										name='end'
										value={edu.end}
										onChange={(e) => {
											const newSection = resumeData.sections;
											newSection[3].education[index].end = e.target.value;
											setResumeData({ ...resumeData, sections: newSection });
										}}
									/>

									<button
										onClick={() => {
											let sectionArr = resumeData.sections;
											sectionArr[3].education.splice(index, 1);
											setResumeData({ ...resumeData, sections: sectionArr });
										}}
									>
										⊘
									</button>
								</div>
							</div>
						))}
						<button
							className='action-button x-small'
							onClick={() => {
								let sectionArr = resumeData.sections;
								sectionArr[3].education.push({
									place: '',
									start: '',
									end: '',
									degree: '',
								});
								setResumeData({ ...resumeData, sections: sectionArr });
							}}
						>
							Add Education +
						</button>
					</section>

					{/* Experience Section */}
					<section
						id='experience'
						className='form-section'
					>
						<p className='section-label x-large bold'>Experience</p>
						{resumeData.sections[4].experience.map((exp, index) => (
							<div
								className='link-inputs'
								key={index}
							>
								<div className='form-row'>
									<input
										type='text'
										placeholder='Company Name'
										value={exp.company}
										name='company'
										onChange={(e) => {
											const newSection = resumeData.sections;
											newSection[4].experience[index].company = e.target.value;
											setResumeData({ ...resumeData, sections: newSection });
										}}
									/>
									<button
										onClick={() => {
											let sectionArr = resumeData.sections;
											sectionArr[4].experience.splice(index, 1);
											setResumeData({ ...resumeData, sections: sectionArr });
										}}
									>
										⊘
									</button>
								</div>
								<div className='form-row'>
									<input
										type='text'
										className='year-input'
										placeholder='start year'
										name='start'
										value={exp.start}
										onChange={(e) => {
											const newSection = resumeData.sections;
											newSection[4].experience[index].start = e.target.value;
											setResumeData({ ...resumeData, sections: newSection });
										}}
									/>
									<input
										type='text'
										className='year-input'
										placeholder='End / Current'
										name='end'
										value={exp.end}
										onChange={(e) => {
											const newSection = resumeData.sections;
											newSection[4].experience[index].end = e.target.value;
											setResumeData({ ...resumeData, sections: newSection });
										}}
									/>
								</div>
								<div className='form-row'>
									<textarea
										rows={3}
										placeholder='About your work in the company'
										name='about'
										value={exp.about}
										onChange={(e) => {
											const newSection = resumeData.sections;
											newSection[4].experience[index].about = e.target.value;
											setResumeData({ ...resumeData, sections: newSection });
										}}
									/>
								</div>
							</div>
						))}
						<button
							className='action-button x-small'
							onClick={() => {
								let sectionArr = resumeData.sections;
								sectionArr[3].education.push({
									place: '',
									start: '',
									end: '',
									degree: '',
								});
								setResumeData({ ...resumeData, sections: sectionArr });
							}}
						>
							Add Experience +
						</button>
					</section>

					{/* Achievements Section */}
					<section
						id='achievements'
						className='form-section'
					>
						<p className='section-label x-large bold'>Achievements</p>
						{resumeData.sections[5].achievements.map((achvt, index) => (
							<div
								className='link-inputs'
								key={index}
							>
								<div className='form-row'>
									<input
										type='text'
										placeholder='Achievement Name'
										value={achvt.achievement}
										name='achievement'
										onChange={(e) => {
											const newSection = resumeData.sections;
											newSection[5].achievements[index].achievement =
												e.target.value;
											setResumeData({ ...resumeData, sections: newSection });
										}}
									/>
									<button
										onClick={() => {
											let sectionArr = resumeData.sections;
											sectionArr[5].achievements.splice(index, 1);
											setResumeData({ ...resumeData, sections: sectionArr });
										}}
									>
										⊘
									</button>
								</div>

								<div className='form-row'>
									<input
										type='text'
										className='year-input'
										placeholder='year'
										name='year'
										value={achvt.year}
										onChange={(e) => {
											const newSection = resumeData.sections;
											newSection[5].achievements[index].year = e.target.value;
											setResumeData({ ...resumeData, sections: newSection });
										}}
									/>
									<input
										type='text'
										placeholder='place'
										name='place'
										value={achvt.place}
										onChange={(e) => {
											const newSection = resumeData.sections;
											newSection[5].achievements[index].place = e.target.value;
											setResumeData({ ...resumeData, sections: newSection });
										}}
									/>
								</div>
								<div className='form-row'>
									<textarea
										rows={4}
										placeholder='About your achievement'
										name='about'
										value={achvt.about}
										onChange={(e) => {
											const newSection = resumeData.sections;
											newSection[5].achievements[index].about = e.target.value;
											setResumeData({ ...resumeData, sections: newSection });
										}}
									/>
								</div>
							</div>
						))}
						<button
							className='action-button x-small'
							onClick={() => {
								let sectionArr = resumeData.sections;
								sectionArr[5].achievements.push({
									achievement: '',
									year: '',
									place: '',
									about: '',
								});
								setResumeData({ ...resumeData, sections: sectionArr });
							}}
						>
							Add Achievement +
						</button>
					</section>
				</form>
			</div>
			<Resume data={resumeData} />
		</>
	);
}

export default App;
