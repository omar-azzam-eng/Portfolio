import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState, type CSSProperties } from 'react';
import type { Project } from '../types/portfolio';

type MlStage = 'image' | 'features' | 'model' | 'class';

interface ProjectVisualProps {
  readonly project: Project;
}

const ML_STAGES: readonly { readonly id: MlStage; readonly label: string }[] = [
  { id: 'image', label: 'IMAGE' },
  { id: 'features', label: 'FEATURES' },
  { id: 'model', label: 'MODEL' },
  { id: 'class', label: 'CLASS' },
];

function MachineLearningVisual({ project }: { readonly project: Project }) {
  const reduceMotion = useReducedMotion();
  const [activeStage, setActiveStage] = useState<MlStage>('image');

  useEffect(() => {
    if (reduceMotion) return undefined;

    const timer = window.setInterval(() => {
      setActiveStage((current) => {
        const currentIndex = ML_STAGES.findIndex((stage) => stage.id === current);
        return ML_STAGES[(currentIndex + 1) % ML_STAGES.length].id;
      });
    }, 1100);

    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const activeLabel = ML_STAGES.find((stage) => stage.id === activeStage)?.label ?? 'IMAGE';

  return (
    <div className="project-visual ml-visual" role="img" aria-label="Animated machine learning pipeline visualization">
      <div className="ml-topline">
        <span>MODEL PIPELINE</span>
        <span className="ml-live-status"><i aria-hidden="true" /> PROCESSING · {activeLabel}</span>
      </div>

      <div className="scan-frame" aria-hidden="true">
        <div className="scan-rings" />
        <div className="scan-target" />
        <motion.div
          className="scan-line"
          animate={reduceMotion ? undefined : { y: ['5%', '90%', '5%'] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="ml-activity">
          {Array.from({ length: 12 }, (_, index) => <i key={index} style={{ '--bar-index': index } as CSSProperties} />)}
        </div>
      </div>

      <div className="ml-result">
        <span>VALIDATION</span>
        <strong>{project.metric?.value}</strong>
        <small>{project.metric?.label}</small>
        <div className="ml-runtime" aria-hidden="true">
          <span>STATUS</span><b>RUNNING</b>
          <span>INPUT</span><b>CT SCAN</b>
          <span>OUTPUT</span><b>CLASSIFICATION</b>
        </div>
      </div>

      <div className="ml-pipeline" aria-hidden="true">
        {ML_STAGES.map((stage, index) => (
          <div className="ml-stage-wrap" key={stage.id}>
            <span className={activeStage === stage.id ? 'ml-stage is-active' : 'ml-stage'}>{stage.label}</span>
            {index < ML_STAGES.length - 1 && <i>→</i>}
          </div>
        ))}
      </div>
    </div>
  );
}

function BackendVisual() {
  return (
    <div className="project-visual backend-visual simple-backend-visual" role="img" aria-label="PharmaLink backend system flow">
      <div className="backend-topline">
        <span>BACKEND SYSTEM</span>
        <span className="backend-simple-status">SCALABLE · REAL-TIME</span>
      </div>

      <div className="backend-flow" aria-hidden="true">
        <div className="backend-flow-node is-accent">
          <span>API</span>
          <small>REST</small>
        </div>
        <span className="backend-flow-arrow">→</span>
        <div className="backend-flow-node">
          <span>AUTH</span>
          <small>JWT</small>
        </div>
        <span className="backend-flow-arrow">→</span>
        <div className="backend-flow-node">
          <span>CORE</span>
          <small>Node.js</small>
        </div>
        <span className="backend-flow-arrow">→</span>
        <div className="backend-flow-node">
          <span>DB</span>
          <small>PostgreSQL</small>
        </div>
      </div>

      <div className="backend-realtime" aria-hidden="true">
        <span className="backend-realtime-dot" />
        <div>
          <strong>WebSocket</strong>
          <small>Real-time updates</small>
        </div>
      </div>

      <div className="backend-stack-line" aria-hidden="true">
        <span>Node.js</span>
        <span>TypeScript</span>
        <span>TypeORM</span>
        <span>PostgreSQL</span>
      </div>
    </div>
  );
}

export function ProjectVisual({ project }: ProjectVisualProps) {
  if (project.visual === 'ml') return <MachineLearningVisual project={project} />;
  return <BackendVisual />;
}
