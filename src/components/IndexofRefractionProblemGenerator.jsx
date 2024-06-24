import React, { useState, useEffect } from 'react';

const SPEED_OF_LIGHT = 3.00e8; // m/s

const materials = [
  { name: 'Helium', index: 1.000036, state: 'gaseous' },
  { name: 'Hydrogen', index: 1.000132, state: 'gaseous' },
  { name: 'Air', index: 1.000277, state: 'gaseous' },
  { name: 'Carbon Dioxide', index: 1.001, state: 'gaseous' },
  { name: 'Liquid Helium', index: 1.025, state: 'liquid' },
  { name: 'Water Ice', index: 1.31, state: 'solid' },
  { name: 'Water', index: 1.330, state: 'liquid' },
  { name: 'Acetone', index: 1.36, state: 'liquid' },
  { name: 'Ethanol', index: 1.361, state: 'liquid' },
  { name: 'Kerosene', index: 1.39, state: 'liquid' },
  { name: 'Corn Oil', index: 1.47, state: 'liquid' },
  { name: 'Glycerol', index: 1.4729, state: 'liquid' },
  { name: 'Acrylic Glass', index: 1.491, state: 'solid' },
  { name: 'Benzene', index: 1.501, state: 'liquid' },
  { name: 'Crown Glass', index: 1.52, state: 'solid' },
  { name: 'Plate Glass', index: 1.52, state: 'solid' },
  { name: 'Sodium Chloride', index: 1.544, state: 'solid' },
  { name: 'Amber', index: 1.55, state: 'solid' },
  { name: 'Polycabonate', index: 1.60, state: 'solid' },
  { name: 'Flint Glass', index: 1.61, state: 'solid' },
  { name: 'Bromine', index: 1.661, state: 'liquid' },
  { name: 'Sapphire', index: 1.77, state: 'solid' },
  { name: 'Cubic Zirconia', index: 2.165, state: 'solid' },
  { name: 'Diamond', index: 2.417, state: 'solid' },
  { name: 'Silicon', index: 3.45, state: 'solid' },
  { name: 'Germanium', index: 4.03, state: 'solid' },
];

const formatSpeed = (speed) => {
  const [coefficient, exponent] = speed.toExponential(2).split('e');
  return (
    <span>
      {parseFloat(coefficient).toFixed(2)} &times; 10<sup>{parseInt(exponent)}</sup> m/s
    </span>
  );
};

const generateProblem = () => {
  const problemTypes = [
    { type: 'findIndex', question: 'Calculate the index of refraction' },
    { type: 'findSpeed', question: 'Calculate the speed of light' },
  ];

  const selectedType = problemTypes[Math.floor(Math.random() * problemTypes.length)];
  const material = materials[Math.floor(Math.random() * materials.length)];

  let problem, answer, givenInfo, useEquation;

  if (selectedType.type === 'findIndex') {
    const speed = SPEED_OF_LIGHT / material.index;
    problem = (
      <span>
        {selectedType.question} for {material.state} {material.name} if the speed of light in this medium is {formatSpeed(speed)}.
      </span>
    );
    answer = material.index.toFixed(2);
    givenInfo = <span>Speed of light in {material.name}: {formatSpeed(speed)}</span>;
    useEquation = "n = c / v";
  } else {
    const speed = SPEED_OF_LIGHT / material.index;
    problem = (
      <span>
        {selectedType.question} in {material.state} {material.name} if its index of refraction is {material.index}.
      </span>
    );
    answer = formatSpeed(speed);
    givenInfo = <span>Index of refraction of {material.name}: {material.index}</span>;
    useEquation = "n = c / v  rearranged to  v = c / n";
  }

  return { problem, answer, givenInfo, material, selectedType, useEquation };
};

const RefractionProblemGenerator = () => {
  const [problem, setProblem] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    handleGenerateProblem();
  }, []);

  const handleGenerateProblem = () => {
    setProblem(generateProblem());
    setShowHelp(false);
    setShowAnswer(false);
  };

  const toggleHelp = () => setShowHelp(!showHelp);
  const toggleAnswer = () => setShowAnswer(!showAnswer);

  if (!problem) return <div>Loading...</div>;

  return (
    <div className="p-8 max-w-3xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Index of Refraction Practice Problems</h1>
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="font-bold mb-2">Problem</h2>
        <p>{problem.problem}</p>
      </div>
      <div className="flex justify-between mb-6">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={showHelp}
            onChange={toggleHelp}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2">Show Help</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={showAnswer}
            onChange={toggleAnswer}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2">Show Answer</span>
        </label>
      </div>
      {showHelp && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="font-bold mb-2">Given Information</h2>
          <ul className="list-disc pl-5">
            <li>Speed of light in vacuum (c): {formatSpeed(SPEED_OF_LIGHT)}</li>
            <li>{problem.givenInfo}</li>
          </ul>
          <h2 className="font-bold mt-4 mb-2">Equation to Use</h2>
          <p>{problem.useEquation}</p>
          <p>Where:</p>
          <ul className="list-disc pl-5">
            <li>n: index of refraction</li>
            <li>c: speed of light in vacuum</li>
            <li>v: speed of light in the medium</li>
          </ul>
        </div>
      )}
      {showAnswer && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="font-bold mb-2">Answer</h2>
          <p>{problem.selectedType.type === 'findIndex' ? 'Index of refraction' : 'Speed of light in medium'}: {problem.answer}</p>
        </div>
      )}
      <button 
        onClick={handleGenerateProblem}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Generate New Problem
      </button>
    </div>
  );
};

export default RefractionProblemGenerator;