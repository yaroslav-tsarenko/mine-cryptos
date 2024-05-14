import { FunctionComponent } from "react";
import { Button } from "@mui/material";
import GroupComponent3 from "../components/GroupComponent3";
import GroupComponent2 from "../components/GroupComponent2";
import styles from "./TermsConditions.module.css";

const TermsConditions: FunctionComponent = () => {
  return (
    <div className={styles.termsConditions}>

      <section className={styles.certainlyHeresASampleTerWrapper}>
        <div className={styles.certainlyHeresAContainer}>
          <p className={styles.certainlyHeresA}>
            Certainly, here's a sample terms and conditions agreement for
            'MineCryptos':
          </p>
          <p className={styles.blankLine}>&nbsp;</p>
          <p className={styles.termsAndConditions}>**Terms and Conditions**</p>
          <p className={styles.blankLine1}>&nbsp;</p>
          <p className={styles.pleaseReadThese}>
            Please read these terms and conditions carefully before using the
            services provided by MineCryptos. By using our services, you agree
            to abide by these terms and conditions. If you do not agree with
            these terms, please refrain from using our services.
          </p>
          <p className={styles.blankLine2}>&nbsp;</p>
          <p className={styles.services}>**1. Services**</p>
          <p className={styles.blankLine3}>&nbsp;</p>
          <p className={styles.minecryptosProvidesCryptocur}>
            MineCryptos provides cryptocurrency mining hosting, hardware sales,
            and related services to customers. By using our services, you agree
            to adhere to all applicable laws and regulations.
          </p>
          <p className={styles.blankLine4}>&nbsp;</p>
          <p className={styles.userAccounts}>**2. User Accounts**</p>
          <p className={styles.blankLine5}>&nbsp;</p>
          <p className={styles.youMayBe}>
            You may be required to create an account to access certain services.
            You are responsible for maintaining the confidentiality of your
            account information and for any activity that occurs under your
            account.
          </p>
          <p className={styles.blankLine6}>&nbsp;</p>
          <p className={styles.payments}>**3. Payments**</p>
          <p className={styles.blankLine7}>&nbsp;</p>
          <p className={styles.allFeesAnd}>
            All fees and charges are due and payable as per the terms of the
            service agreement. Failure to pay fees may result in the suspension
            or termination of your services.
          </p>
          <p className={styles.blankLine8}>&nbsp;</p>
          <p className={styles.cancellationAndRefunds}>
            **4. Cancellation and Refunds**
          </p>
          <p className={styles.blankLine9}>&nbsp;</p>
          <p className={styles.pleaseReferTo}>
            Please refer to our "Cancellation Policy" and "Refund Policy" for
            details on cancellations and refunds.
          </p>
          <p className={styles.blankLine10}>&nbsp;</p>
          <p className={styles.privacy}>**5. Privacy**</p>
          <p className={styles.blankLine11}>&nbsp;</p>
          <p className={styles.yourUseOf}>
            Your use of our services is also governed by our "Privacy Policy,"
            which outlines how we collect, use, and safeguard your personal
            information.
          </p>
          <p className={styles.blankLine12}>&nbsp;</p>
          <p className={styles.userConduct}>**6. User Conduct**</p>
          <p className={styles.blankLine13}>&nbsp;</p>
          <p className={styles.youAgreeNot}>
            You agree not to engage in any activity that disrupts or interferes
            with the proper functioning of our services. You also agree not to
            attempt unauthorized access to our systems.
          </p>
          <p className={styles.blankLine14}>&nbsp;</p>
          <p className={styles.dataBackupAnd}>**7. Data Backup and Loss**</p>
          <p className={styles.blankLine15}>&nbsp;</p>
          <p className={styles.weAreNot}>
            We are not responsible for any data loss resulting from the
            termination of services. It is your responsibility to back up your
            data.
          </p>
          <p className={styles.blankLine16}>&nbsp;</p>
          <p className={styles.intellectualProperty}>
            **8. Intellectual Property**
          </p>
          <p className={styles.blankLine17}>&nbsp;</p>
          <p className={styles.allContentOn}>
            All content on our website and associated materials is protected by
            copyright, trademark, and other intellectual property laws. You may
            not use our content without our explicit permission.
          </p>
          <p className={styles.blankLine18}>&nbsp;</p>
          <p className={styles.changesToServices}>**9. Changes to Services**</p>
          <p className={styles.blankLine19}>&nbsp;</p>
          <p className={styles.weReserveThe}>
            We reserve the right to modify, suspend, or discontinue any part of
            our services at any time without notice.
          </p>
          <p className={styles.blankLine20}>&nbsp;</p>
          <p className={styles.limitationOfLiability}>
            **10. Limitation of Liability**
          </p>
          <p className={styles.blankLine21}>&nbsp;</p>
          <p className={styles.weAreNot1}>
            We are not liable for any indirect, special, or consequential
            damages, or for any loss of data or profits. Our total liability is
            limited to the amount paid for the services.
          </p>
          <p className={styles.blankLine22}>&nbsp;</p>
          <p className={styles.governingLaw}>**11. Governing Law**</p>
          <p className={styles.blankLine23}>&nbsp;</p>
          <p className={styles.theseTermsAnd}>
            These terms and conditions are governed by the laws of [Your
            Jurisdiction], and you agree to submit to the exclusive jurisdiction
            of its courts.
          </p>
          <p className={styles.blankLine24}>&nbsp;</p>
          <p className={styles.changesToTerms}>
            **12. Changes to Terms and Conditions**
          </p>
          <p className={styles.blankLine25}>&nbsp;</p>
          <p className={styles.weMayRevise}>
            We may revise these terms and conditions at any time. Any changes
            will be effective immediately upon posting on our website.
          </p>
          <p className={styles.blankLine26}>&nbsp;</p>
          <p className={styles.byUsingOur}>
            By using our services, you acknowledge that you have read and
            understood these terms and conditions and agree to be bound by them.
            If you do not agree with these terms, please do not use our
            services.
          </p>
          <p className={styles.blankLine27}>&nbsp;</p>
          <p className={styles.ifYouHave}>
            If you have any questions or concerns, please contact us via
            [contact information].
          </p>
        </div>
      </section>
      <section className={styles.termsConditionsInner}>
        <div className={styles.frameParent}>
          <div className={styles.exploreOurCryptoMiningSoluParent}>
            <h1 className={styles.exploreOurCrypto}>
              Explore Our Crypto Mining Solutions
            </h1>
            <Button
              className={styles.frameChild}
              disableElevation={true}
              variant="outlined"
              sx={{
                textTransform: "none",
                color: "#3f28c6",
                fontSize: "16",
                borderColor: "#3f28c6",
                borderRadius: "100px",
                "&:hover": { borderColor: "#3f28c6" },
                width: 152,
                height: 56,
              }}
            >
              View All
            </Button>
          </div>
          <div className={styles.instanceParent}>
            <div className={styles.rectangleParent}>
              <img
                className={styles.instanceChild}
                loading="lazy"
                alt=""
                src="/rectangle-11@2x.png"
              />
              <div className={styles.frameGroup}>
                <div className={styles.bitforgeProMinerParent}>
                  <h3 className={styles.bitforgeProMiner}>
                    CryptoVault Hosting
                  </h3>
                  <div className={styles.sha256AlgorithmMining}>
                    SHA-256 Algorithm Mining Server110 TH/s | 3450 W | 31.5 W/TH
                  </div>
                </div>
                <b className={styles.credit20000}>Credit: 200.00</b>
              </div>
            </div>
            <div className={styles.rectangleGroup}>
              <img
                className={styles.instanceItem}
                loading="lazy"
                alt=""
                src="/rectangle-11-1@2x.png"
              />
              <div className={styles.frameContainer}>
                <div className={styles.bitforgeProMinerGroup}>
                  <h3 className={styles.bitforgeProMiner1}>HashPower Hub</h3>
                  <div className={styles.sha256AlgorithmMining1}>
                    SHA-256 Algorithm Mining Server110 TH/s | 3450 W | 31.5 W/TH
                  </div>
                </div>
                <b className={styles.credit200001}>Credit: 200.00</b>
              </div>
            </div>
            <div className={styles.rectangleContainer}>
              <img
                className={styles.instanceInner}
                loading="lazy"
                alt=""
                src="/rectangle-11-2@2x.png"
              />
              <div className={styles.frameDiv}>
                <div className={styles.bitforgeProMinerContainer}>
                  <h3 className={styles.bitforgeProMiner2}>BitMine Nexus</h3>
                  <div className={styles.sha256AlgorithmMining2}>
                    SHA-256 Algorithm Mining Server110 TH/s | 3450 W | 31.5 W/TH
                  </div>
                </div>
                <b className={styles.credit200002}>Credit: 200.00</b>
              </div>
            </div>
            <div className={styles.rectangleParent1}>
              <img
                className={styles.rectangleIcon}
                loading="lazy"
                alt=""
                src="/rectangle-11-3@2x.png"
              />
              <div className={styles.frameParent1}>
                <div className={styles.bitforgeProMinerParent1}>
                  <h3 className={styles.bitforgeProMiner3}>SecureHash Haven</h3>
                  <div className={styles.sha256AlgorithmMining3}>
                    SHA-256 Algorithm Mining Server110 TH/s | 3450 W | 31.5 W/TH
                  </div>
                </div>
                <b className={styles.credit200003}>Credit: 200.00</b>
              </div>
            </div>
          </div>
        </div>
      </section>
      <GroupComponent2 />
    </div>
  );
};

export default TermsConditions;
