import { Link } from "react-router";
import { Zap, Shield, Users, Target, Eye, ArrowRight } from "lucide-react";

function About() {
  const features = [
    {
      icon: <Zap className="h-6 w-6 text-blue-600" />,
      title: "AI-Powered Detection",
      description:
        "Our advanced AI analyzes uploaded images to identify potential illegal connections with high accuracy.",
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      title: "Community Driven",
      description:
        "Empowering citizens to report suspicious activities and contribute to a safer community.",
    },
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: "Admin Verification",
      description:
        "All reports are reviewed by trained administrators to ensure proper action is taken.",
    },
  ];

  const stats = [
    { value: "10K+", label: "Reports Filed" },
    { value: "95%", label: "AI Accuracy" },
    { value: "500+", label: "Verified Cases" },
    { value: "24/7", label: "Monitoring" },
  ];

  const teamMembers = [
    {
      id: "1",
      fullNames: "Mrs Twetwa-Dude Sithandiwe",
      roles: ["lead developer", "researcher", "business analyst"],
      occupation: "Development Software Lecturer (WSU)",
      image: "images/sithandiwe.jpeg",
    },
    {
      id: "2",
      fullNames: "Mr Mangena Tebatso",
      roles: ["fullstack developer", "researcher"],
      occupation: "Student (WSU)",
      image: "images/Mangena-T.jpg",
    },
    {
      id: "3",
      fullNames: "Mr Bavuma Kamvelihle",
      roles: ["fullstack developer", "researcher"],
      occupation: "Student (WSU)",
      image: "images/kamva.jpg",
    },
  ];

  return (
    <div className="bg-linear-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            About <span className="text-blue-600">Izinyoka Tracker</span>
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-600">
            We're on a mission to combat illegal electricity connections through
            technology, community engagement, and transparency.
          </p>
          <div className="mt-10">
            <Link
              to="/sign-up"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
            >
              Join the movement
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center mb-4">
                <Target className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                To provide a reliable platform that enables citizens to report
                illegal electricity connections quickly and accurately, while
                leveraging artificial intelligence to streamline verification and
                ensure accountability.
              </p>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <Eye className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-800">Our Vision</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                A future where illegal connections are significantly reduced through
                community vigilance and smart technology, leading to safer
                neighborhoods and a more reliable power grid for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100 text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            How We Make a Difference
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition"
              >
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet the Team</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            A dedicated group of engineers, data scientists, and community
            organizers working tirelessly to make a difference.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.fullNames}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {member.fullNames}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{member.occupation}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {member.roles.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to make a difference?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of citizens helping to eradicate illegal connections.
          </p>
          <Link
            to="/sign-up"
            className="inline-flex items-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition"
          >
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;