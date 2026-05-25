const projects = [
  {
    name: "Bittensor decentralized AI inference",
    type: "Private infrastructure",
    domain: "ml",
    language: "Python / CUDA",
    featured: true,
    description:
      "Contributed as a top-ranked miner in Bittensor Subnet 19, a competitive decentralized image-generation and multimodal reasoning network. Built GPU-accelerated inference pipelines across multi-cloud and bare-metal clusters with an emphasis on latency, throughput, fault tolerance, and automated model rollout workflows.",
    tags: ["bittensor", "gpu inference", "mlops", "distributed systems", "multi-cloud"],
    links: [],
  },
  {
    name: "boileroom",
    type: "Open-source contributor",
    domain: "ml",
    language: "Python",
    featured: false,
    description:
      "Contributor to a Python package that provides a unified interface for protein prediction models across Modal serverless GPUs and Apptainer-based local or HPC execution.",
    tags: ["protein prediction", "modal", "apptainer", "hpc", "open source"],
    links: [
      ["GitHub", "https://github.com/softnanolab/boileroom"],
      ["PyPI", "https://pypi.org/project/boileroom/"],
    ],
  },
  {
    name: "vismatch",
    type: "Computer vision",
    domain: "ml",
    language: "Python",
    featured: true,
    description:
      "Wrapper around 50+ image matching models with a unified interface, created for easier experimentation and comparison.",
    tags: ["computer vision", "image matching", "models"],
    links: [
      ["GitHub", "https://github.com/michaelkrasa/vismatch"],
      ["Project site", "https://earthloc-and-earthmatch.github.io/"],
    ],
  },
  {
    name: "fleet-forge",
    type: "Telemetry platform",
    domain: "systems",
    language: "Python",
    description:
      "Distributed robot fleet telemetry platform with gRPC ingest, Kafka streaming, validation, object storage, Postgres metadata, FastAPI query APIs, Prometheus metrics, dashboards, and load-test tooling.",
    tags: ["grpc", "kafka", "fastapi", "postgres", "prometheus"],
    links: [
      ["GitHub", "https://github.com/michaelkrasa/fleet-forge"],
    ],
  },
  {
    name: "alpha-ess-charging-optimizer",
    type: "Energy optimizer",
    domain: "energy",
    language: "Python",
    description:
      "Battery charge and discharge optimizer for AlphaESS systems using Czech day-ahead electricity prices at 15-minute granularity to improve savings and grid efficiency.",
    tags: ["alphaess", "battery", "solar", "electricity prices", "optimization"],
    links: [
      ["GitHub", "https://github.com/michaelkrasa/alpha-ess-charging-optimizer"],
    ],
  },
  {
    name: "alpha-ess-mcp-server",
    type: "Agent tooling",
    domain: "energy",
    language: "Python",
    description:
      "MCP server exposing structured AlphaESS inverter and battery telemetry, historical data, and control APIs for automation agents and external services.",
    tags: ["mcp", "alphaess", "telemetry", "automation"],
    links: [
      ["GitHub", "https://github.com/michaelkrasa/alpha-ess-mcp-server"],
    ],
  },
  {
    name: "pi-power-butler",
    type: "Home automation",
    domain: "energy",
    language: "Python",
    description:
      "Smart energy management bot for solar and battery optimization via Telegram, built around practical household automation workflows.",
    tags: ["solar", "battery", "telegram", "automation"],
    links: [
      ["GitHub", "https://github.com/michaelkrasa/pi-power-butler"],
    ],
  },
  {
    name: "ote-cr-price-fetcher",
    type: "Data utility",
    domain: "energy",
    language: "Python",
    description:
      "Async Czech OTE-CR day-ahead electricity price fetcher with robust retries and error handling for reliable optimizer inputs.",
    tags: ["ote-cr", "prices", "async", "retries"],
    links: [
      ["GitHub", "https://github.com/michaelkrasa/ote-cr-price-fetcher"],
      ["Data source", "https://www.ote-cr.cz/cs/kratkodobe-trhy/elektrina"],
    ],
  },
  {
    name: "mini-ml-training-platform",
    type: "ML infrastructure",
    domain: "ml",
    language: "Python",
    description:
      "Compact ML platform demo with reproducible PyTorch training, MLflow tracking and registry, FastAPI inference, and dataset-change retraining.",
    tags: ["pytorch", "mlflow", "fastapi", "retraining"],
    links: [
      ["GitHub", "https://github.com/michaelkrasa/mini-ml-training-platform"],
    ],
  },
  {
    name: "aerostack",
    type: "Simulation",
    domain: "robotics",
    language: "C++",
    description:
      "Modern C++20 simulator for drone swarm missions, path planning, collision avoidance, and telemetry.",
    tags: ["c++20", "drones", "path planning", "telemetry"],
    links: [
      ["GitHub", "https://github.com/michaelkrasa/aerostack"],
    ],
  },
  {
    name: "non-euclidean-spaces-UE4",
    type: "Graphics",
    domain: "graphics",
    language: "Unreal Engine",
    description:
      "University third-year project exploring non-Euclidean spaces in Unreal Engine 4.",
    tags: ["unreal engine", "graphics", "university"],
    links: [
      ["GitHub", "https://github.com/michaelkrasa/non-euclidean-spaces-UE4"],
    ],
  },
];

const filters = [
  ["all", "All"],
  ["systems", "Systems"],
  ["energy", "Energy"],
  ["ml", "ML"],
  ["robotics", "Robotics"],
  ["graphics", "Graphics"],
];
let activeFilter = "all";
let searchTerm = "";

const projectGrid = document.querySelector("#project-grid");
const projectCount = document.querySelector("#project-count");
const filterList = document.querySelector("#project-filters");
const searchInput = document.querySelector("#project-search");

function normalize(value) {
  return value.toLowerCase().trim();
}

function projectMatches(project) {
  const haystack = normalize(
    [project.name, project.type, project.domain, project.language, project.description, ...project.tags].join(" "),
  );
  const matchesFilter = activeFilter === "all" || project.domain === activeFilter;
  const matchesSearch = !searchTerm || haystack.includes(searchTerm);
  return matchesFilter && matchesSearch;
}

function renderFilters() {
  filterList.innerHTML = filters
    .map(
      ([value, label]) => `
        <button class="filter-button ${value === activeFilter ? "is-active" : ""}" type="button" data-filter="${value}">
          ${label}
        </button>
      `,
    )
    .join("");
}

function renderProjects() {
  const visibleProjects = projects.filter(projectMatches);
  projectCount.textContent = `${visibleProjects.length} project${visibleProjects.length === 1 ? "" : "s"} shown`;

  projectGrid.innerHTML = visibleProjects
    .map(
      (project) => `
        <article class="project-card ${project.featured ? "is-featured" : ""}">
          <div class="project-top">
            <span class="project-type">${project.type}</span>
            <span class="project-meta">${project.language}</span>
          </div>
          <div class="project-body">
            <h3>${project.name}</h3>
            <p>${project.description}</p>
            <div class="tag-list" aria-label="${project.name} tags">
              ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
            </div>
          </div>
          ${
            project.links.length
              ? `<div class="project-links">
                  ${project.links
                    .map(([label, href]) => `<a class="project-link" href="${href}">${label}</a>`)
                    .join("")}
                </div>`
              : ""
          }
        </article>
      `,
    )
    .join("");
}

filterList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-filter]");
  if (!button) return;
  activeFilter = button.dataset.filter;
  renderFilters();
  renderProjects();
});

searchInput.addEventListener("input", (event) => {
  searchTerm = normalize(event.target.value);
  renderProjects();
});

renderFilters();
renderProjects();
