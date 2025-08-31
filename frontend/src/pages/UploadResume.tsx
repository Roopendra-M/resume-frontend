import { useCallback, useState } from 'react';
import api from '../lib/api';

export default function UploadResume(){
  const [file, setFile] = useState<File|null>(null);
  const [result, setResult] = useState<any|null>(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback((e: React.DragEvent)=>{
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) setFile(f);
  },[]);

  const submit = async (e:any)=>{
    e.preventDefault();
    if(!file) return;
    const form = new FormData();
    form.append('file', file);
    setUploading(true);
    try{
      const {data} = await api.post('/resume/upload', form, { headers: {'Content-Type':'multipart/form-data'}});
      setResult(data);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-semibold mb-4">Upload Resume</h2>

      <form onSubmit={submit} className="p-4 glass space-y-3">
        <div
          onDragOver={(e)=>e.preventDefault()}
          onDrop={onDrop}
          className="border-2 border-dashed rounded-lg p-6 text-center"
        >
          <div className="text-dim mb-2">Drag & drop your file here</div>
          <input type="file" accept=".pdf,.docx" onChange={e=>setFile(e.target.files?.[0]||null)} />
          {file && <div className="text-sm mt-2"><strong>Selected:</strong> {file.name}</div>}
        </div>
        <button disabled={uploading || !file} className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white">
          {uploading ? 'Uploading…' : 'Upload'}
        </button>
      </form>

      {result && (
        <div className="mt-4 p-4 glass">
          <div className="font-semibold mb-2">Resume Processed</div>

          {result.similarity_score && Object.keys(result.similarity_score).length > 0 ? (
            <div className="mt-2 space-y-2">
              <div className="font-medium">Similarity Scores</div>
              {Object.entries(result.similarity_score).map(([jd, score]: any)=>(
                <div key={jd}>
                  <div className="flex justify-between text-sm">
                    <span className="text-dim">{jd}</span>
                    <span>{score}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded">
                    <div
                      className="h-2 bg-indigo-600 rounded"
                      style={{ width: `${Math.min(100, Number(score)||0)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-dim">No job descriptions compared</div>
          )}

          {result.skills?.length>0 && (
            <div className="mt-3">
              <div className="font-medium mb-1">Extracted Skills</div>
              <div className="flex flex-wrap gap-2">
                {result.skills.map((s:string)=>(
                  <span key={s} className="text-xs px-2 py-1 rounded-full border border-indigo-500/40 bg-indigo-500/10">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {result.text_excerpt && (
            <div className="text-xs text-dim mt-3">
              Excerpt: {result.text_excerpt}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
