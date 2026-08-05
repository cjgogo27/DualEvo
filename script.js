const filterButtons = document.querySelectorAll(".filter-button");
const videoCards = document.querySelectorAll(".video-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));

    videoCards.forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !show);
      if (!show) card.querySelector("video")?.pause();
    });
  });
});

const comparisonCases = {
  classify: {
    successVideo: "assets/videos/skill-classify-success.mp4",
    failureVideo: "assets/videos/skill-classify-failure.mp4",
    successPoster: "assets/posters/skill-classify-success.png",
    failurePoster: "assets/posters/skill-classify-failure.png",
    successEpisode: "Episode 0",
    failureEpisode: "Episode 1",
    successCopy: "B3 v2 · seed 0 · the correct objects reach their destinations.",
    failureCopy: "Same run and task; execution diverges before terminal completion.",
  },
  stack: {
    successVideo: "assets/videos/skill-stack-success.mp4",
    failureVideo: "assets/videos/skill-stack-failure.mp4",
    successPoster: "assets/posters/skill-stack-success.png",
    failurePoster: "assets/posters/skill-stack-failure.png",
    successEpisode: "Episode 4",
    failureEpisode: "Episode 0",
    successCopy: "B3 v1 · seed 0 · one of five episodes reaches terminal success.",
    failureCopy: "Same run and task; the stack is not completed before termination.",
  },
};

const successVideo = document.querySelector("#success-video");
const failureVideo = document.querySelector("#failure-video");
const successEpisode = document.querySelector("#success-episode");
const failureEpisode = document.querySelector("#failure-episode");
const successCopy = document.querySelector("#success-copy");
const failureCopy = document.querySelector("#failure-copy");

document.querySelectorAll(".case-button").forEach((button) => {
  button.addEventListener("click", () => {
    const selected = comparisonCases[button.dataset.case];
    document.querySelectorAll(".case-button").forEach((item) => {
      item.classList.toggle("is-active", item === button);
    });

    [successVideo, failureVideo].forEach((video) => video.pause());
    successVideo.src = selected.successVideo;
    failureVideo.src = selected.failureVideo;
    successVideo.poster = selected.successPoster;
    failureVideo.poster = selected.failurePoster;
    successEpisode.textContent = selected.successEpisode;
    failureEpisode.textContent = selected.failureEpisode;
    successCopy.textContent = selected.successCopy;
    failureCopy.textContent = selected.failureCopy;
    successVideo.load();
    failureVideo.load();
  });
});

document.querySelectorAll("main video:not(.hero-media video)").forEach((video) => {
  video.addEventListener("play", () => {
    document.querySelectorAll("main video:not(.hero-media video)").forEach((other) => {
      if (other !== video) other.pause();
    });
  });
});

const hero = document.querySelector(".hero");
const heroVideos = document.querySelectorAll(".hero-media video");
const heroObserver = new IntersectionObserver(
  ([entry]) => {
    heroVideos.forEach((video) => {
      if (entry.isIntersecting && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  },
  { threshold: 0.15 },
);
heroObserver.observe(hero);

const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-25% 0px -65% 0px" },
);
sections.forEach((section) => sectionObserver.observe(section));
