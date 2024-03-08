type ProfileDetailsProps = {
  label: string;
  value: React.ReactNode;
};

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ label, value }) => {
  return (
    <div>
      <span className="font-bold">{label}: </span>
      {value}
    </div>
  );
};

export default ProfileDetails;
