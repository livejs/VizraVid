// include functions to export nodes ( connect, start & stop etc)

function makeAnalyserNode(audioApiContext, fftSize) {
	let analyserNode = audioApiContext.createAnalyser();
	analyserNode.fftSize = fftSize;
	return analyserNode;
}

// export { makeAnalyserNode };