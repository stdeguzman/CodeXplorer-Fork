import React, { useState } from 'react';
import "./App.css";
import LeftNav from "./Components/LeftNav";
import ExplorerBar from "./Components/ExplorerBar";
import TabBar from "./Components/TabBar";
import BreadCrumbBar from "./Components/BreadCrumbBar";
import CodeWindow from "./Components/CodeWindow";
import RemoteWindowButton from "./Components/RemoteWindowButton";
import BottomBar from "./Components/BottomBar";
import "./stylesheets/codeWindow.css";
import { fetchGitHubRepoContents } from './Functions/GitHubContents';
import { processTree } from './Functions/ProcessPaths';

const { files, fileContents } = await fetchGitHubRepoContents('haewonc', 'CodeXplorer', 'main');
const repoTree = await processTree(files, fileContents);
// const repoTree = {'folders': {'Folder 1': {'folders': {}, 'files': {'two.txt': 'HELLO WORLD'}}}, 'files': {'sheet.txt': 'WHAT IS UP'}};

function App() {
	const [codeContent, setCodeContent] = useState(''); // State variable for code content

	const updateCodeContent = (newContent) => {
	  setCodeContent(newContent);
	};
	return (
		<>
			<div className="noselect">
				<LeftNav />
				<ExplorerBar repoTree={repoTree} updateCodeContent={updateCodeContent} />
				<TabBar />
				<BreadCrumbBar />
			</div>
			<CodeWindow codeContent={codeContent} />
			<div className="noselect">
				<RemoteWindowButton />
				<BottomBar />
			</div>
		</>
	);
}

export default App;
