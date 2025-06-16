
import { Clock, Users, Video, CheckCircle } from 'lucide-react';

const InfoSession = () => {
  const agendaItems = [
    "What AI really is - explained simply for educators",
    "Global success stories of AI transforming education",
    "The current AI landscape in Nigerian education",
    "Live demonstrations of AI tools for your classroom",
    "Interactive Q&A and personalized recommendations"
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-stone-50 to-amber-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
            What You'll Learn in This FREE Interactive Session
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive 90-minute workshop designed specifically for Nigerian educators
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-green-900 mb-6">Session Agenda</h3>
              <div className="space-y-4">
                {agendaItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-green-900 mb-6">Session Details</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Clock className="w-8 h-8 text-amber-400" />
                  <div>
                    <h4 className="font-semibold text-green-900">Duration</h4>
                    <p className="text-gray-600">90 minutes interactive workshop</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Video className="w-8 h-8 text-amber-400" />
                  <div>
                    <h4 className="font-semibold text-green-900">Format</h4>
                    <p className="text-gray-600">Online via Zoom - join from anywhere in Nigeria</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Users className="w-8 h-8 text-amber-400" />
                  <div>
                    <h4 className="font-semibold text-green-900">Capacity</h4>
                    <p className="text-gray-600">Limited to 50 participants for interactive experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-800 to-green-900 rounded-xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Next Session Starting Soon!</h3>
            <div className="flex justify-center items-center gap-8 text-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400">2</div>
                <div className="text-green-200">Days</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400">14</div>
                <div className="text-green-200">Hours</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400">32</div>
                <div className="text-green-200">Minutes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSession;
