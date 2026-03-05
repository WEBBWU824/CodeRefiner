/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { refineCode, RefineOptions } from './services/geminiService';
import { Button, Select, Toggle } from './components/UIComponents';

export default function App() {
  const [code, setCode] = useState('');
  const [refinedCode, setRefinedCode] = useState('');
  const [options, setOptions] = useState<RefineOptions>({
    addComments: false,
    commentDensity: 'medium',
    commentStyle: 'professional',
    commentComplexity: 'concise',
    commentLanguage: 'English',
  });
  const [loading, setLoading] = useState(false);

  const handleRefine = async () => {
    setLoading(true);
    try {
      const result = await refineCode(code, options);
      setRefinedCode(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 p-8 md:p-16">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-semibold tracking-tight text-neutral-900">CodeRefiner</h1>
          <p className="text-neutral-500 mt-2">Elegant, precise code optimization.</p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste your code here..."
              className="w-full h-96 p-4 font-mono text-sm border-none focus:ring-0 resize-none"
            />
          </div>

          <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm flex flex-col gap-6">
            <Toggle label="Add Comments" checked={options.addComments} onChange={(v) => setOptions({...options, addComments: v})} />
            
            {options.addComments && (
              <>
                <Select label="Density" value={options.commentDensity} onChange={(v) => setOptions({...options, commentDensity: v as any})} options={[{label: 'Low', value: 'low'}, {label: 'Medium', value: 'medium'}, {label: 'High', value: 'high'}]} />
                <Select label="Style" value={options.commentStyle} onChange={(v) => setOptions({...options, commentStyle: v as any})} options={[{label: 'Professional', value: 'professional'}, {label: 'Casual', value: 'casual'}, {label: 'Technical', value: 'technical'}]} />
                <Select label="Complexity" value={options.commentComplexity} onChange={(v) => setOptions({...options, commentComplexity: v as any})} options={[{label: 'Concise', value: 'concise'}, {label: 'Detailed', value: 'detailed'}]} />
                <Select label="Language" value={options.commentLanguage} onChange={(v) => setOptions({...options, commentLanguage: v as any})} options={[{label: 'English', value: 'English'}, {label: 'Chinese', value: 'Chinese'}, {label: 'Spanish', value: 'Spanish'}, {label: 'French', value: 'French'}, {label: 'Japanese', value: 'Japanese'}]} />
              </>
            )}
            
            <Button onClick={handleRefine} disabled={loading || !code}>
              {loading ? 'Refining...' : 'Refine Code'}
            </Button>
          </div>
        </div>

        {refinedCode && (
          <div className="mt-8 bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Refined Code</h2>
            <pre className="font-mono text-sm overflow-x-auto">{refinedCode}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
