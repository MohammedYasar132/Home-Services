import Service from "../models/Service.js";
import Subcategory from "../models/Subcategory.js";
const seedDatabase = async () => {
  try {
    const serviceCount = await Service.countDocuments();
    if (serviceCount > 0) {
      console.log("Database already seeded. Skipping initial seeding.");
      return;
    }
    console.log("Seeding initial services and subcategories...");
    // Clear any existing subcategories just in case
    await Subcategory.deleteMany({});
    // 1. Define main services
    const servicesData = [
      {
        name: "Cleaning",
        icon: "FaBroom",
        description:
          "Professional cleaning services for every corner of your home, including deep scrubbing, dusting, and eco-friendly sanitization.",
        image:
          "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop",
      },
      {
        name: "Electrical",
        icon: "FaBolt",
        description:
          "Certified and experienced electricians for wiring, appliance repair, switchboard installations, and solving power failures.",
        image:
          "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop",
      },
      {
        name: "Plumbing",
        icon: "FaWrench",
        description:
          "Reliable plumbers to fix leaks, clear clogged drains, repair pipes, and install bathroom fittings and water storage tanks.",
        image:
          "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=600&auto=format&fit=crop",
      },
      {
        name: "AC Service",
        icon: "FaSnowflake",
        description:
          "Expert heating and air conditioning repair, deep cleaning, installation, and gas charging to keep your home cool.",
        image:
          "https://images.unsplash.com/photo-1621905252507-b354bc25edac?q=80&w=600&auto=format&fit=crop",
      },
      {
        name: "Carpenter",
        icon: "FaHammer",
        description:
          "Skilled carpenters for furniture repair, lock installations, custom wooden wardrobes, cabinet assemblies, and door adjustments.",
        image:
          "https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?q=80&w=600&auto=format&fit=crop",
      },
      {
        name: "Painting",
        icon: "FaPaintRoller",
        description:
          "Complete home styling with interior, exterior, wall texture, stencil art, moisture repair, and premium wall finishes.",
        image:
          "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=600&auto=format&fit=crop",
      },
      {
        name: "Pest Control",
        icon: "FaBug",
        description:
          "Safe, eco-friendly pest management for cockroaches, bedbugs, termites, rodents, and mosquitoes with long-term protection.",
        image:
          "https://images.unsplash.com/photo-1587324438673-56c8025e1777?q=80&w=600&auto=format&fit=crop",
      },
    ];
    const insertedServices = await Service.insertMany(servicesData);
    console.log(
      `Successfully seeded ${insertedServices.length} main services.`,
    );
    // Map service names to database objects for easy referencing
    const serviceMap = {};
    insertedServices.forEach((s) => {
      serviceMap[s.name] = s._id;
    });
    // 2. Define subcategories matching parent service IDs
    const subcategoriesData = [
      // === CLEANING ===
      {
        serviceId: serviceMap["Cleaning"],
        name: "Bathroom Deep Cleaning",
        price: 39,
        description:
          "Complete scaling and sanitization of tiles, floor, toilet bowl, bathtub, taps, and mirror. High-end eco-friendly chemicals used.",
        features: [
          "Removal of hard water stains & yellow scales",
          "Sanitization of all touchpoints (toilet, taps, etc.)",
          "Grout cleaning and floor scrubbing",
          "Mirror & metallic fittings polishing",
        ],
        whatsIncluded: [
          "Manual scrubbing of walls & floors with specialized liquids",
          "Cleaning of windows, exhaust fans, and light fixtures",
          "Polishing of taps, showerheads, and cabinets",
          "Waste disposal & final sanitization spray",
        ],
        estimatedTime: "1 - 1.5 Hours",
        whyChooseUs: [
          "Trained & background-verified cleaning crew",
          "Biodegradable chemical solution safe for family & pets",
          "100% satisfaction or free re-clean guarantee",
          "We bring our own professional cleaning kit",
        ],
        image:
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop",
      },
      {
        serviceId: serviceMap["Cleaning"],
        name: "Kitchen Deep Cleaning",
        price: 59,
        description:
          "Deep cleaning of countertops, cabinet exteriors/interiors, chimney, exhaust, stove, and tiles. Stubborn grease and soot removal.",
        features: [
          "De-greasing of chimney and stove hobs",
          "Internal & external cabinet deep scrubbing",
          "Wall tiles scaling and kitchen floor washing",
          "Stainless steel fixtures polishing",
        ],
        whatsIncluded: [
          "Removal of greasy layers from tiles and gas stoves",
          "Wiping down of electronic appliance exteriors",
          "Cleaning of kitchen sink, taps, and drain outlets",
          "Trash bag replacement & floor sanitization",
        ],
        estimatedTime: "2 - 3 Hours",
        whyChooseUs: [
          "Advanced industrial-grade de-greasing agents",
          "Professional technicians trained in modern kitchen care",
          "No hidden costs, transparent upfront pricing",
          "Safety-first approach with sanitized gear",
        ],
        image:
          "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop",
      },
      {
        serviceId: serviceMap["Cleaning"],
        name: "Full Home Deep Cleaning",
        price: 149,
        description:
          "Complete home makeover cleaning. Dusting, vacuuming, floor scrubbing, kitchen degreasing, bathroom sanitizing, and balcony washing.",
        features: [
          "Vacuuming of sofas, carpets, and window curtains",
          "Deep scrubbing of kitchen and bathrooms",
          "Dusting of fans, lights, walls, and ceiling edges",
          "Wet mopping and mechanical floor scrubbing",
        ],
        whatsIncluded: [
          "Detailed cleaning of all rooms, balconies, and passages",
          "Wiping of wardrobes, doors, handles, and electrical plates",
          "Stain removal from floors and glass windows",
          "Sanitization of the entire household environment",
        ],
        estimatedTime: "5 - 6 Hours",
        whyChooseUs: [
          "Supervised team of 3-4 professional cleaners",
          "State-of-the-art vacuum cleaners and scrubbing machines",
          "Eco-friendly and baby-safe disinfection sprays",
          "Comprehensive checklist verified by customer post-service",
        ],
        image:
          "https://images.unsplash.com/photo-1603712760358-54255cf477f1?q=80&w=600&auto=format&fit=crop",
      },
      // === ELECTRICAL ===
      {
        serviceId: serviceMap["Electrical"],
        name: "Fan Installation & Repair",
        price: 15,
        description:
          "Installation of ceiling, exhaust, or wall fans. Fixing speed issues, noisy bearings, and replacing faulty capacitors.",
        features: [
          "Quick repair of slow rotations and bearing sounds",
          "Safe installation of new decorative ceiling fans",
          "Capacitor and regulator checks",
          "Testing all speeds post-installation",
        ],
        whatsIncluded: [
          "Removing old fan (in case of replacement)",
          "Mounting fan blades, downrod, and safety check",
          "Correct wire connection with insulation tape",
          "Speed regulator verification",
        ],
        estimatedTime: "30 - 45 Minutes",
        whyChooseUs: [
          "Certified government-licensed electricians",
          "Standard safety equipment and tools utilized",
          "30-day post-service warranty",
          "Accurate testing tools to prevent short circuits",
        ],
        image:
          "https://images.unsplash.com/photo-1558211583-d26f62177b97?q=80&w=600&auto=format&fit=crop",
      },
      {
        serviceId: serviceMap["Electrical"],
        name: "Switchboard Repair & Install",
        price: 25,
        description:
          "Replacing burnt switch points, repairing internal board wiring, installing modular boards, and updating old switch designs.",
        features: [
          "Diagnostics of loose connections or sparks",
          "Replacement of individual switches, sockets, or fuses",
          "Installation of new smart modular boards",
          "High load appliance safety routing",
        ],
        whatsIncluded: [
          "Power isolation setup for absolute safety",
          "Replacement of faulty sockets, switches, or regulators",
          "Internal wiring routing cleanup",
          "Testing pins with load tester",
        ],
        estimatedTime: "45 Minutes",
        whyChooseUs: [
          "Background-checked skilled electricians",
          "Use of premium flame-retardant spare parts only",
          "Affordable price with detailed diagnostic reports",
          "On-time service execution",
        ],
        image:
          "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=600&auto=format&fit=crop",
      },
      // === PLUMBING ===
      {
        serviceId: serviceMap["Plumbing"],
        name: "Tap & Leak Repair",
        price: 19,
        description:
          "Fixing leaking kitchen taps, bathroom mixers, washbasin valves, and leaking water pipes under sinks to save water.",
        features: [
          "Repair or replacement of damaged washers or cartridges",
          "Leak sealing for sink pipes and main joints",
          "Installation of brand new branded designer taps",
          "Thread sealing using premium Teflon tape",
        ],
        whatsIncluded: [
          "Dismantling of the leaking tap / valve",
          "Locating internal cracks or broken threads",
          "Installing brand-new seals or replacing the assembly",
          "Water flow pressure checks",
        ],
        estimatedTime: "30 - 60 Minutes",
        whyChooseUs: [
          "Experienced plumbers with modern plumbing toolkits",
          "Assistance in choosing quality replacements if needed",
          "Zero-mess post-service cleanup",
          "100% leak-proof assurance with warranty",
        ],
        image:
          "https://images.unsplash.com/photo-1542013936693-8848e574047a?q=80&w=600&auto=format&fit=crop",
      },
      {
        serviceId: serviceMap["Plumbing"],
        name: "Water Tank Cleaning",
        price: 49,
        description:
          "Complete vacuuming and UV sanitization of overhead and underground water tanks to remove sludge, algae, and bacteria.",
        features: [
          "Mechanized extraction of mud, sludge, and algae",
          "High-pressure washing of interior walls",
          "Anti-bacterial spray treatment",
          "UV disinfection sterilization process",
        ],
        whatsIncluded: [
          "Emptying remaining water via sump pumps",
          "Manual scrubbing of interior surfaces",
          "High-pressure jet spraying to remove stains",
          "Eco-friendly disinfection spray coating",
        ],
        estimatedTime: "1.5 - 2 Hours",
        whyChooseUs: [
          "Strict hygiene guidelines followed by staff",
          "No harmful chemical residues in water supply",
          "Before-and-after photos shared with the client",
          "Saves plumbing fixtures from clogging with silt",
        ],
        image:
          "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=600&auto=format&fit=crop",
      },
      // === AC SERVICE ===
      {
        serviceId: serviceMap["AC Service"],
        name: "AC Jet Cleaning Service",
        price: 29,
        description:
          "High-pressure foam and water jet cleaning of split or window AC indoor/outdoor units to restore maximum cooling efficiency.",
        features: [
          "Jet pump cleaning of cooling coils & blowers",
          "Drain tray cleanout to fix dripping water",
          "Air filter deep washing and drying",
          "Outdoor unit condenser cleaning",
        ],
        whatsIncluded: [
          "Placing waterproof protective jacket under AC unit",
          "Jet spray of pure water & eco-cleaner foam",
          "Clearing clogging dirt from the drain pipe",
          "Temperature & electrical current draw testing",
        ],
        estimatedTime: "1 Hour",
        whyChooseUs: [
          "Reduces power bills by up to 25%",
          "Improves airflow and filters out allergens",
          "Certified HVAC engineers with advanced tools",
          "Prevents ice formation on coils",
        ],
        image:
          "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&auto=format&fit=crop",
      },
      {
        serviceId: serviceMap["AC Service"],
        name: "AC Gas Charging",
        price: 69,
        description:
          "Complete diagnostics of gas pressure, leak identification, soldering repairs, nitrogen pressure tests, and refilling R32/R410/R22 gas.",
        features: [
          "Comprehensive leakage test & repair",
          "Vacuuming of the AC refrigerant lines",
          "Precise weighing scale gas charging",
          "Suction and discharge pressure checks",
        ],
        whatsIncluded: [
          "Detecting copper pipe leakage points",
          "Brazing/welding leaks and replacing filters",
          "Removing moisture by vacuuming lines",
          "Refilling fresh refrigerant gas to standard levels",
        ],
        estimatedTime: "1.5 - 2 Hours",
        whyChooseUs: [
          "We use only genuine 100% pure refrigerant gas",
          "60-day cool air guarantee on gas charging",
          "Transparent pressure gauges demonstrated to user",
          "Experienced technicians equipped with safety harnesses",
        ],
        image:
          "https://images.unsplash.com/photo-1621905252507-b354bc25edac?q=80&w=600&auto=format&fit=crop",
      },
      // === CARPENTER ===
      {
        serviceId: serviceMap["Carpenter"],
        name: "Door & Lock Repairs",
        price: 20,
        description:
          "Fixing creaky doors, shaving swollen doors, aligning hinges, and installing new door handles, latches, or main door smart locks.",
        features: [
          "Alignment checks for doors rubbing on floors",
          "Installation of mortise locks, deadbolts, or keypad locks",
          "Hinges replacement or oiling",
          "Mesh screen door repair",
        ],
        whatsIncluded: [
          "Inspecting door hinges and structural wood warping",
          "Chiseling out socket space for lock templates",
          "Tightening structural plates and testing keys",
          "Cleaning wood shavings and dust",
        ],
        estimatedTime: "45 - 90 Minutes",
        whyChooseUs: [
          "Skilled carpenters with high-precision chiseling tools",
          "Handling all types of wood, plywood, or metal frames",
          "Same-day door lock security restoration",
          "Standard prices with no surprise charges",
        ],
        image:
          "https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?q=80&w=600&auto=format&fit=crop",
      },
      // === PAINTING ===
      {
        serviceId: serviceMap["Painting"],
        name: "Single Wall Texture Painting",
        price: 99,
        description:
          "Add a premium accent wall with textures like metallic, spatula, safari, stucco, or custom stencil work to elevate your living room.",
        features: [
          "Creative patterns customized to matching room colors",
          "Use of premium dust-resistant textured paint",
          "Professional wall masking for razor-sharp edges",
          "Durable acrylic protective topcoats",
        ],
        whatsIncluded: [
          "Scraping and filling wall putty cracks",
          "Applying primary base coats of emulsion",
          "Applying texture using specialized tools/rollers",
          "Post-paint masking cleanup & furniture replacement",
        ],
        estimatedTime: "1 Day",
        whyChooseUs: [
          "Certified Asian Paints / Berger master painters",
          "Laser-accurate masking sheets for mess-free service",
          "1-year crack-free texture warranty",
          "Beautiful custom stencil pattern catalog provided",
        ],
        image:
          "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=600&auto=format&fit=crop",
      },
      // === PEST CONTROL ===
      {
        serviceId: serviceMap["Pest Control"],
        name: "Cockroach & Ant Control",
        price: 35,
        description:
          "Odourless herbal gel bait treatment combined with synthetic pyrethroid spray in cracks to permanently eliminate cockroaches and ants.",
        features: [
          "Advanced odourless herbal gel dot application",
          "Targeted spray in sinks, pipes, and dry balconies",
          "Eco-friendly and 100% human-safe treatment",
          "Disrupts pest reproductive lifecycle",
        ],
        whatsIncluded: [
          "Inspecting high-infestation points (kitchen, sink, under stove)",
          "Placing gel baits in hinges, cabinets, and drawers",
          "Spray treatment for bathroom drains and outer areas",
          "Prevention consultation checklist",
        ],
        estimatedTime: "45 Minutes",
        whyChooseUs: [
          "No need to empty kitchen cabinets or leave the house",
          "Government approved safe eco-formulations",
          "90-day pest-free warranty with a free touchup visit",
          "Safe for babies, pregnant women, and elderly",
        ],
        image:
          "https://images.unsplash.com/photo-1587324438673-56c8025e1777?q=80&w=600&auto=format&fit=crop",
      },
    ];
    const insertedSubcategories =
      await Subcategory.insertMany(subcategoriesData);
    console.log(
      `Successfully seeded ${insertedSubcategories.length} subcategories.`,
    );
    console.log("Seeding process complete!");
  } catch (error) {
    console.error(`Database seeding failed: ${error.message}`);
  }
};
export default seedDatabase;
