"use client";
import { improveWithAI, saveResume } from '@/actions/resume';
import { resumeSchema } from '@/app/lib/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import useFetch from '@/hooks/use-fetch';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertTriangle, Download, Edit, Loader2, Monitor, Save, Sparkles } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import EntryForm from './entry-form';
import { toast } from 'sonner';
import { entriesToMarkdown } from '@/app/lib/helper';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useUser } from '@clerk/nextjs';

const ResumeBuilder = ({ initialContent }) => {
    const [activeTab, setActiveTab] = useState("edit");
    const [resumeMode, setResumeMode] = useState("preview");
    const [previewMode, setPreviewMode] = useState(initialContent);
    const { user } = useUser();
    const [isGenerating, setIsGenerating] = useState(false);

    const {
        control,
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(resumeSchema),
        defaultValues: {
            contactInfo: {},
            summary: "",
            skills: "",
            experience: [],
            education: [],
            projects: [],
        },
    });

    const {
        loading: isSaving,
        fn: saveResumeFn,
        data: saveResult,
        error: saveError,
    } = useFetch(saveResume);

    // Watch form fields for preview updates
    const formValues = watch();


    useEffect(() => {
        if (initialContent) setActiveTab("preview");
    }, [initialContent]);

    // Update preview content when form values change
    useEffect(() => {
        if (activeTab === "edit") {
            const newContent = getCombinedContent();
            setPreviewMode(newContent ? newContent : initialContent);
        }
    }, [formValues, activeTab]);

    const getContactMarkdown = () => {
        const { contactInfo } = formValues;
        const parts = [];
        if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
        if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
        if (contactInfo.linkedin)
            parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
        if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

        return parts.length > 0
            ? `## <div align="center">${user.fullName}</div>
            \n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
            : "";
    };

    const getCombinedContent = () => {
        const { summary, skills, experience, education, projects } = formValues;

        return [
            getContactMarkdown(),
            summary && `## Professional Summary\n\n${summary}`,
            skills && `## Skills\n\n${skills}`,
            entriesToMarkdown(experience, "Work Experience"),
            entriesToMarkdown(education, "Education"),
            entriesToMarkdown(projects, "Projects"),
        ]
            .filter(Boolean)
            .join("\n\n");
    };

    useEffect(() => {
        if (saveResult && !isSaving) {
            toast.success("Resume saved successfully!");
        }
        if (saveError) {
            toast.error(saveError.message || "Failed to save resume");
        }
    }, [saveResult, saveError, isSaving]);

    const onSubmit = async () => {
        try {
            await saveResumeFn(previewMode);
        } catch (error) {
            console.error("Save error:", error)
        }
    };

    const generatePDF = async () => {
        setIsGenerating(true);
        try {
            const html2pdf = (await import("html2pdf.js")).default;
            const element = document.getElementById("resume-pdf");
            
            const opt = {
                margin: [15, 15],
                filename: "resume.pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { 
                    scale: 2,
                },
                jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            };

            await html2pdf().set(opt).from(element).save();
        } catch (error) {
            console.error("PDF generation error:", error);
        } finally {
            setIsGenerating(false);
        }
    }

    // Improve with AI 

    const {
        loading: isImproving,
        fn: improveWithAIFn,
        data: improvedContent,
        error: improveError,
    } = useFetch(improveWithAI);

    useEffect(() => {
        if (improvedContent && !isImproving) {
            setValue("summary", improvedContent);
            toast.success("Summary improved successfully!");
        }

        if (improveError) {
            toast.error(improveError.message || "Failed to improve summary");
        }
    }, [improvedContent, improveError, isImproving]);

    const handleImproveSummary = async () => {
        const summary = watch("summary");
        if (!summary) {
            toast.error("Please enter a description first");
            return;
        }

        const type = "summary";

        await improveWithAIFn({
            current: summary,
            type: type.toLowerCase(),
        });
    };

    return (
        <div className='space-y-4'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-2'>
                <h1 className='text-5xl md:text-6xl bg-gradient-to-b from-gray-400 via-gray-200 to-gray-600 font-extrabold tracking-tighter text-transparent bg-clip-text pb-2 pr-2 mb-5'>Resume Builder</h1>

                <div className='space-x-2'>
                    <Button variant="destructive" onClick={onSubmit} disabled={isSaving}>
                        {isSaving ? (
                            <>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin'/>Saving...
                            </>
                        ) : (
                            <>
                                <Save className='h-4 w-4'  />
                                Save
                            </>
                        )}
                    </Button>
                    <Button onClick={generatePDF} disabled={isGenerating}>
                        {isGenerating ? (
                            <>
                                <Loader2 className='h-4 w-4 animate-spin' />
                            </>
                        ) : (
                            <>
                                <Download className='h-4 w-4' />
                                Download PDF
                            </>   
                        )}
                    </Button>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                    <TabsTrigger value="edit">Form</TabsTrigger>
                    <TabsTrigger value="preview">Markdown</TabsTrigger>
                </TabsList>
                <TabsContent value="edit">
                    <form className='space-y-8' onSubmit={handleSubmit(onSubmit)}>
                        <div className='space-y-4'>
                            <h3 className='text-lg font-medium'>Contact Information</h3>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50'>
                                <div className='space-y-2'>
                                    <label className='text-sm font-medium'>Email</label>
                                    <Input {...register("contactInfo.email")} type="email" placeholder="your@email.com" error={errors.contactInfo?.email} />

                                    {errors.contactInfo?.email && (
                                        <p className='text-sm text-red-500'>{errors.contactInfo.email.message}</p>
                                    )}
                                </div>

                                <div className='space-y-2'>
                                    <label className='text-sm font-medium'>Mobile Number</label>
                                    <Input {...register("contactInfo.mobile")} type="tel" placeholder="+91 723 523 2802" />

                                    {errors.contactInfo?.mobile && (
                                        <p className='text-sm text-red-500'>{errors.contactInfo.mobile.message}</p>
                                    )}
                                </div>

                                <div className='space-y-2'>
                                    <label className='text-sm font-medium'>LinkedIn URL</label>
                                    <Input {...register("contactInfo.linkedin")} type="url" placeholder="https://linkedin.com/in/your-profile" />

                                    {errors.contactInfo?.linkedin && (
                                        <p className='text-sm text-red-500'>{errors.contactInfo.linkedin.message}</p>
                                    )}
                                </div>

                                <div className='space-y-2'>
                                    <label className='text-sm font-medium'>Twitter/X Profile</label>
                                    <Input {...register("contactInfo.twitter")} type="url" placeholder="https://twitter.com/your-handle" />

                                    {errors.contactInfo?.twitter && (
                                        <p className='text-sm text-red-500'>{errors.contactInfo.twitter.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Professional Summary</h3>
                            <Controller
                                name="summary"
                                control={control}
                                render={({ field }) => (
                                    <Textarea
                                        {...field}
                                        className="h-32"
                                        placeholder="Write a compelling professional summary..."
                                        error={errors.summary}
                                    />
                                )}
                            />
                            {errors.summary && (
                                <p className="text-sm text-red-500">{errors.summary.message}</p>
                            )}
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={handleImproveSummary}
                                disabled={isImproving || !watch("summary")}
                            >
                                {isImproving ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Improving...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="h-4 w-4 mr-2" />
                                        Improve with AI
                                    </>
                                )}
                            </Button>
                        </div>

                        {/* Skills */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Skills</h3>
                            <Controller
                                name="skills"
                                control={control}
                                render={({ field }) => (
                                    <Textarea
                                        {...field}
                                        className="h-32"
                                        placeholder="List your key skills..."
                                        error={errors.skills}
                                    />
                                )}
                            />
                            {errors.skills && (
                                <p className="text-sm text-red-500">{errors.skills.message}</p>
                            )}
                        </div>

                        {/* Experience */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Work Experience</h3>
                            <Controller
                                name="experience"
                                control={control}
                                render={({ field }) => (
                                    <EntryForm
                                        type="Experience"
                                        entries={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.experience && (
                                <p className="text-sm text-red-500">
                                    {errors.experience.message}
                                </p>
                            )}
                        </div>

                        {/* Education */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Education</h3>
                            <Controller
                                name="education"
                                control={control}
                                render={({ field }) => (
                                    <EntryForm
                                        type="Education"
                                        entries={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.education && (
                                <p className="text-sm text-red-500">
                                    {errors.education.message}
                                </p>
                            )}
                        </div>

                        {/* Projects */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium">Projects</h3>
                            <Controller
                                name="projects"
                                control={control}
                                render={({ field }) => (
                                    <EntryForm
                                        type="Project"
                                        entries={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {errors.projects && (
                                <p className="text-sm text-red-500">
                                    {errors.projects.message}
                                </p>
                            )}
                        </div>
                    </form>
                </TabsContent>
                <TabsContent value="preview">
                    <Button variant="link" type="button" className="mb-2" onClick={() => setResumeMode(resumeMode === "preview" ? "edit" : "preview")}>
                        {resumeMode === "preview" ? (
                            <>
                                <Edit className="h-4 w-4" />
                                Edit Resume
                            </>
                        ) : (
                            <>
                                <Monitor className="h-4 w-4" />
                                Show Preview
                            </>
                        )}
                    </Button>
                    {resumeMode !== "preview" && (
                        <div className="flex p-3 gap-2 items-center border-2 border-yellow-600 text-yellow-600 rounded mb-2">
                            <AlertTriangle className="h-5 w-5" />
                            <span className="text-sm">
                                You will lose editied markdown if you update the form data.
                            </span>
                        </div>
                    )}
                    <div className="border rounded-lg">
                        <MarkdownEditor
                            value={previewMode}
                            onChange={setPreviewMode}
                            height={800}
                            preview={resumeMode}
                        />
                    </div>
                    <div className='hidden'>
                        <div id='resume-pdf'>
                            <MarkdownEditor.Markdown source={previewMode} style={{
                                background: "white",
                                color: "black",
                            }}/>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

        </div>
    )
}

export default ResumeBuilder