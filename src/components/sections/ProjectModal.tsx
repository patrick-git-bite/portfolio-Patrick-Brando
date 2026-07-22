import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import type { Project } from "../../lib/data";

interface ProjectModalProps {
  project: Project | null;
  onOpenChange: (open: boolean) => void;
}

export default function ProjectModal({ project, onOpenChange }: ProjectModalProps) {
  return (
    <Dialog open={Boolean(project)} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto border-line bg-surface p-0 text-paper">
        {project && (
          <div className="p-6 sm:p-8">
            <DialogHeader>
              <DialogTitle className="font-display text-xl text-paper sm:text-2xl">{project.title}</DialogTitle>
            </DialogHeader>
            <p className="mt-2 mb-8 leading-relaxed text-muted">{project.description}</p>

            <div className="space-y-8">
              {project.sections.map((section) => (
                <div key={section.title} className="border border-line p-5 sm:p-6">
                  <h4 className="mb-4 flex items-center gap-2 text-paper">
                    <span className="h-1.5 w-1.5 bg-accent" />
                    {section.title}
                  </h4>
                  <div className={section.image ? "grid gap-5 sm:grid-cols-2 sm:items-start" : ""}>
                    {section.image && (
                      <img
                        src={section.image}
                        alt={section.title}
                        className="h-48 w-full rounded-sm object-cover sm:h-56"
                      />
                    )}
                    <ul className="space-y-2">
                      {section.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm text-muted">
                          <span className="mt-2 h-1 w-1 flex-shrink-0 bg-accent/60" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
