import { profile } from "@/lib/data";

export function ResumeSection() {
  return (
    <section id="resume" data-reveal>
      <div className="section-head">
        <div>
          <p className="kicker">Record</p>
          <h2>
            <span className="emoji" aria-hidden="true">📄</span> The file a recruiter <em>keeps</em>.
          </h2>
        </div>
        <p>Education, the direct line, and the PDF. Same tenure as the timeline: Huawei, L&amp;T, CitiusTech, IQVIA.</p>
      </div>
      <div className="resume-panel">
        <div>
          <p className="lede" style={{ marginTop: 0 }}>
            {profile.education} from {profile.school}. {profile.years} years from Huawei to SDE-4 at {profile.company}.
          </p>
          <div className="resume-facts">
            <div>
              <span className="emoji">📍</span>
              {profile.location}
            </div>
            <div>
              <span className="emoji">📞</span>
              <a href={profile.phoneHref}>{profile.phone}</a>
            </div>
            <div>
              <span className="emoji">✉️</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
          </div>
        </div>
        <div className="actions">
          <a className="btn solid" href={profile.resume} download>
            <span className="emoji" aria-hidden="true">📄</span> Download resume
          </a>
          <a className="btn ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
