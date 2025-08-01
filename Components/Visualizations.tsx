import React from 'react';
import { BalanceIcon } from './icons';

const VisualizationCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
    <h3 className="text-lg font-bold text-primary-600 dark:text-primary-400 mb-4">{title}</h3>
    <div>{children}</div>
  </div>
);

const Step: React.FC<{ number: number; title: string; description: string; isLast?: boolean }> = ({ number, title, description, isLast }) => (
    <div className="relative pl-8">
        <div className="absolute left-0 top-0 flex items-center">
            <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
            {!isLast && <div className="absolute top-4 left-1/2 w-0.5 h-full bg-primary-500/50 -translate-x-1/2"></div>}
        </div>
        <div className="mb-8">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">{number}. {title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{description}</p>
        </div>
    </div>
);


const Visualizations: React.FC = () => {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-gray-100 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6 border-b-2 border-primary-500 pb-2">
          Legal Process Visualizations
        </h2>
        <div className="space-y-8">
          
          <VisualizationCard title="Process of Filing a Civil Suit">
            <div>
                <Step number={1} title="Filing of Plaint" description="The suit is initiated by presenting a plaint (a written complaint) to the court." />
                <Step number={2} title="Summons to Defendant" description="The court issues a summons to the defendant to appear and answer the claim." />
                <Step number={3} title="Written Statement" description="The defendant files a 'written statement' admitting or denying the allegations in the plaint." />
                <Step number={4} title="Framing of Issues" description="The court frames the issues (points of dispute) based on the pleadings of both parties." />
                <Step number={5} title="Evidence Stage" description="Both parties present their evidence, including documents and witness testimonies." />
                <Step number={6} title="Final Arguments" description="Lawyers for both sides present their final arguments, summarizing their case and evidence." />
                <Step number={7} title="Judgment and Decree" description="The court delivers its judgment, followed by a decree that formalizes the decision." isLast={true} />
            </div>
          </VisualizationCard>

          <VisualizationCard title="Stages of a Criminal Trial (Warrant Case)">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="border-r-0 md:border-r md:pr-4 border-dashed border-gray-400 dark:border-gray-600">
                    <h4 className="font-bold text-center mb-2 text-gray-700 dark:text-gray-300">Pre-Trial</h4>
                    <ul className="space-y-2 list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                        <li>FIR or Complaint</li>
                        <li>Investigation by Police</li>
                        <li>Filing of Chargesheet</li>
                        <li>Cognizance by Magistrate</li>
                    </ul>
                </div>
                 <div>
                    <h4 className="font-bold text-center mb-2 text-gray-700 dark:text-gray-300">Trial</h4>
                    <ul className="space-y-2 list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                        <li>Framing of Charges</li>
                        <li>Plea of Guilty (or Not Guilty)</li>
                        <li>Prosecution Evidence</li>
                        <li>Statement of Accused (Sec 313 CrPC)</li>
                        <li>Defence Evidence</li>
                        <li>Final Arguments</li>
                        <li>Judgment</li>
                    </ul>
                </div>
             </div>
          </VisualizationCard>

        </div>
      </div>
    </div>
  );
};

export default Visualizations;
