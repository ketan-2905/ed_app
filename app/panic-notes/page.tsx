'use client';

import { useState, useEffect } from 'react';
import { FileText, Download, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { getAllFiles, FileData } from '@/lib/db';

export default function PanicNotesPage() {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [files, setFiles] = useState<FileData[]>([]);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [notes, setNotes] = useState<string>('');
  const { toast } = useToast();

  useEffect(() => {
    const loadFiles = async () => {
      try {
        const files = await getAllFiles();
        setFiles(files);
      } catch (error) {
        console.error('Error loading files:', error);
        toast({
          title: 'Error',
          description: 'Failed to load files',
          variant: 'destructive',
        });
      }
    };
    loadFiles();
  }, [toast]);

  const generateNotes = async () => {
    if (selectedFiles.length === 0) {
      toast({
        title: 'Error',
        description: 'Please select at least one file',
        variant: 'destructive',
      });
      return;
    }

    setGenerating(true);
    setProgress(0);

    try {
      // Simulate note generation with dummy data
      const selectedFileData = files.filter(file => selectedFiles.includes(file.id));
      let generatedNotes = '';

      for (let i = 0; i < selectedFileData.length; i++) {
        const file = selectedFileData[i];
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        generatedNotes += `# Notes from ${file.name}\n\n`;
        generatedNotes += `## Key Points\n`;
        generatedNotes += `- Important concept 1 from ${file.name}\n`;
        generatedNotes += `- Critical information about the topic\n`;
        generatedNotes += `- Key takeaway from this section\n\n`;
        
        setProgress(((i + 1) / selectedFileData.length) * 100);
      }

      setNotes(generatedNotes);
      toast({
        title: 'Success',
        description: 'Notes generated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate notes',
        variant: 'destructive',
      });
    } finally {
      setGenerating(false);
      setProgress(0);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(notes);
      toast({
        title: 'Success',
        description: 'Notes copied to clipboard',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy notes',
        variant: 'destructive',
      });
    }
  };

  const downloadNotes = () => {
    const blob = new Blob([notes], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'panic-notes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Success',
      description: 'Notes downloaded successfully',
    });
  };

  return (
    <div className="container mx-auto space-y-8 p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">Generate Panic Notes</h1>
        <p className="text-muted-foreground">
          Select your files and we'll create concise study notes
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-4">
          <label className="text-sm font-medium">Select Files</label>
          <Select
            onValueChange={(value) => setSelectedFiles([...selectedFiles, value])}
          >
            <SelectTrigger>
              <SelectValue placeholder="Choose a file" />
            </SelectTrigger>
            <SelectContent>
              {files.map((file) => (
                <SelectItem key={file.id} value={file.id}>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    {file.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedFiles.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedFiles.map((fileId) => {
                const file = files.find((f) => f.id === fileId);
                return (
                  <div
                    key={fileId}
                    className="flex items-center gap-2 bg-secondary p-2 rounded-md"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{file?.name}</span>
                    <button
                      onClick={() => setSelectedFiles(selectedFiles.filter(id => id !== fileId))}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          <Button
            onClick={generateNotes}
            disabled={generating || selectedFiles.length === 0}
            className="w-full"
          >
            Generate Notes
          </Button>
        </div>

        {generating && (
          <div className="space-y-2">
            <Progress value={progress} />
            <p className="text-sm text-muted-foreground text-center">
              Generating notes... {Math.round(progress)}%
            </p>
          </div>
        )}

        {notes && (
          <div className="space-y-4">
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={downloadNotes}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
            <div className="bg-card p-6 rounded-lg">
              <pre className="whitespace-pre-wrap font-mono text-sm">
                {notes}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}