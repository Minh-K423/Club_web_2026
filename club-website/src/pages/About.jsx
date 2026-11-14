import { useEffect, useRef, useState } from 'react'
import showcasePlaceholder from '../assets/about-showcase.jpg'
import { clubOverview, leadership, showcases } from '../data/about'
import './About.css'

// Add the image in src/assets, uncomment the import, and replace null below with aboutHero.
// import aboutHero from '../assets/about-hero.webp'
const heroImage = null

const iconPaths = {
  arrow: 'M5 12h14m-6-6 6 6-6 6',
  down: 'M12 5v14m-6-6 6 6 6-6',
  close: 'm6 6 12 12M18 6 6 18',
  person: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m12-14a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z',
  mission: 'M12 3v3m0 12v3M3 12h3m12 0h3m-2 0a7 7 0 1 1-14 0 7 7 0 0 1 14 0Zm-4 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  vision: 'M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12Zm13 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  event: 'M7 3v4m10-4v4M3 10h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm7 8v5m-2.5-2.5h5',
}

function Icon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={iconPaths[name]} />
    </svg>
  )
}

function OrgBranch({ member, onOpen }) {
  return (
    <li className="about-org-branch">
      <button
        type="button"
        className="about-org-node about-glass"
        aria-haspopup="dialog"
        onClick={(event) => onOpen({
          title: member.name,
          subtitle: [member.role, member.area].filter(Boolean).join(' · '),
          description: member.bio,
          photo: member.photo,
          photoPosition: member.photoPosition,
          icon: 'person',
        }, event.currentTarget)}
      >
        <span className="about-avatar" aria-hidden="true">
          {member.photo ? <img src={member.photo} alt="" loading="lazy" /> : <Icon name="person" />}
        </span>
        <span className="about-org-role">{member.role}</span>
        <span className="about-org-name">{member.name}</span>
        {member.area && <span className="about-org-area">{member.area}</span>}
      </button>
      {member.reports && (
        <ul className="about-org-children" role="list">
          {member.reports.map((report) => (
            <OrgBranch key={report.id} member={report} onOpen={onOpen} />
          ))}
        </ul>
      )}
    </li>
  )
}

function DetailDialog({ detail, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (detail && !dialog.open) dialog.showModal()
  }, [detail])

  return (
    <dialog
      ref={dialogRef}
      className="about-dialog"
      aria-labelledby="about-detail-title"
      aria-describedby="about-detail-description"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close()
      }}
    >
      {detail && (
        <div className="about-dialog-card">
          {detail.photo ? (
            <img
              className="about-dialog-photo"
              src={detail.photo}
              alt=""
              style={{ objectPosition: detail.photoPosition }}
            />
          ) : (
            <div className="about-dialog-placeholder" aria-hidden="true">
              <Icon name={detail.icon} />
            </div>
          )}
          <div className="about-dialog-frost" aria-hidden="true" />
          <form method="dialog" className="about-dialog-actions">
            <button type="submit" className="about-dialog-close" aria-label="Đóng">
              <Icon name="close" />
            </button>
          </form>
          <div className="about-dialog-copy">
            {detail.subtitle && <p className="about-dialog-role">{detail.subtitle}</p>}
            <h2 id="about-detail-title">{detail.title}</h2>
            <p id="about-detail-description">{detail.description}</p>
          </div>
        </div>
      )}
    </dialog>
  )
}

export default function About() {
  const [detail, setDetail] = useState(null)
  const triggerRef = useRef(null)

  function openDetails(nextDetail, trigger) {
    triggerRef.current = trigger
    setDetail(nextDetail)
  }

  function closeDetails() {
    setDetail(null)
    triggerRef.current?.focus({ preventScroll: true })
  }

  return (
    <div className="about-page" lang="vi">
      <section className="about-hero" aria-labelledby="about-title">
        {heroImage && <img className="about-hero-image" src={heroImage} alt="" />}
        <div className="about-shell about-hero-layout">
          <div className="about-hero-copy">
            <h1 id="about-title" lang="en">About <span>us</span></h1>
            <p>{clubOverview.introduction}</p>
            <a className="about-hero-link" href="#ban-chu-nhiem">
              Xem ban chủ nhiệm <Icon name="down" />
            </a>
          </div>
          {!heroImage && (
            <div className="about-hero-art" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          )}
          <dl className="about-hero-stats">
            <div>
              <dt>Năm thành lập</dt>
              <dd>{clubOverview.founded}</dd>
            </div>
            <div>
              <dt className="sr-only">Số lượng thành viên</dt>
              <dd>{clubOverview.members} thành viên</dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="about-shell about-content">
        <div className="about-overview">
          <section className="about-overview-card about-glass" aria-labelledby="about-mission">
            <span className="about-icon-tile"><Icon name="mission" /></span>
            <h2 id="about-mission">Sứ mệnh</h2>
            <p>{clubOverview.mission}</p>
          </section>
          <section className="about-overview-card about-glass" aria-labelledby="about-vision">
            <span className="about-icon-tile"><Icon name="vision" /></span>
            <h2 id="about-vision">Tầm nhìn</h2>
            <p>{clubOverview.vision}</p>
          </section>
        </div>

        <section className="about-leadership" id="ban-chu-nhiem" aria-labelledby="about-leadership-title">
          <h2 id="about-leadership-title">Ban chủ nhiệm</h2>
          <ul className="about-org" role="list">
            <OrgBranch member={leadership} onOpen={openDetails} />
          </ul>
        </section>
      </div>

      <div className="about-highlights">
        {showcases.map((showcase) => (
          <section key={showcase.id} className="about-showcase" aria-labelledby={showcase.id}>
            <img
              className="about-showcase-image"
              src={showcase.photo ?? showcasePlaceholder}
              alt=""
              loading="lazy"
              style={{ objectPosition: showcase.photoPosition }}
            />
            <div className="about-showcase-copy">
              <h2 id={showcase.id}>{showcase.title}</h2>
              <p>{showcase.brief}</p>
              <button
                type="button"
                className="about-showcase-link"
                aria-haspopup="dialog"
                aria-labelledby={`${showcase.id}-link ${showcase.id}`}
                onClick={(event) => openDetails({ ...showcase, icon: 'event' }, event.currentTarget)}
              >
                <span id={`${showcase.id}-link`} lang="en">Know more</span> <Icon name="arrow" />
              </button>
            </div>
          </section>
        ))}
      </div>

      <DetailDialog detail={detail} onClose={closeDetails} />
    </div>
  )
}
